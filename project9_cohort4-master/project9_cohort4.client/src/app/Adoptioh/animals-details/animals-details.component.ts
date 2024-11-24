import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../Adoptioh/animals.service';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animals-details',
  templateUrl: './animals-details.component.html',
  styleUrls: ['./animals-details.component.css']
})
export class AnimalsDetailsComponent implements OnInit {
  animal: any;
  randomAnimals: any[] = [];
  relatedAnimals: any[] = [];
  adoptionDetails: any = {
    userName: '',
    userEmail: '',
    userMedicalStatus: '',
    housingType: '',
    userFinancialStatus: '',
    userFlatType: '',
    userLivingStatus: '',
    userMoreDetails: ''
  };
  activeImage: string = 'image1'; // الصورة الافتراضية التي سيتم عرضها

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private authService: BUrlServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAnimalDetails();
    this.fetchAnimals();
    this.getUserDetails();
    this.loadRelatedAnimals();
  }

  // دالة لتغيير الصورة المعروضة بناءً على الصورة المصغّرة التي يتم النقر عليها
  changeImage(image: string): void {
    this.activeImage = image;
  }

  rahaf(b: any) {
    const x = localStorage.getItem("userId");
    if (!x) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/animals-form', b]);
    }
  }

  fetchAnimalDetails(): void {
    const animalId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(animalId)) {
      this.animalService.getAnimalById(animalId).subscribe((data: any) => {
        this.animal = data;
      });
    }
  }

  fetchAnimals(): void {
    this.animalService.getAnimals({}).subscribe((data: any[]) => {
      this.randomAnimals = data;
    });
  }

  getUserDetails(): void {
    this.authService.getUserDetails().subscribe((userData: any) => {
      this.adoptionDetails.userName = userData.name;
      this.adoptionDetails.userEmail = userData.email;
    });
  }

  loadRelatedAnimals(): void {
    const animalId = Number(this.route.snapshot.paramMap.get('id'));
    if (animalId) {
      this.animalService.getRelatedAnimal(animalId).subscribe(
        (animals: any) => {
          this.relatedAnimals = animals;
        },
        error => {
          console.error("Error fetching related animals:", error);
        }
      );
    }
  }

  adoptNow(): void {
    this.authService.isLoggedInObs.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/animals-form', this.animal.animalId]);
      } else {
        Swal.fire({
          title: 'Login Required',
          text: 'You have to log in first to adopt an animal.',
          icon: 'warning',
          confirmButtonText: 'Okay'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
