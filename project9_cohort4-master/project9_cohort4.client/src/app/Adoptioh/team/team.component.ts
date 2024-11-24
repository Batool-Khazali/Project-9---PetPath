import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Esraa Odat',
      role: 'Scrum Master',
      image: 'assets/images/team-member-1.jpg' 
    },
    {
      name: 'Batool Khazali',
      role: 'Produnt Owner',
      image: 'assets/images/team-member-2.jpg' 
    },
    {
      name: 'Rahaf Al-Shorman',
      role: 'Web Developer',
      image: 'assets/images/team-member-3.jpg' 
    },
    {
      name: 'Mostafa Al-Momani ',
      role: 'Web Developer',
      image: 'assets/images/team-member-3.jpg' 
    },
    {
      name: 'Malik',
      role: 'Web Developer',
      image: 'assets/images/team-member-3.jpg' 
    }
  
  ];

  constructor() { }

  ngOnInit(): void {
  
  }
}
