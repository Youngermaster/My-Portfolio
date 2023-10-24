// images
import blogImg1 from "../images/blog/img-1.jpg";
import blogImg2 from "../images/blog/img-2.jpg";
import blogImg3 from "../images/blog/img-3.jpg";
import blogImg4 from "../images/blog/img-4.jpg";
import blogImg5 from "../images/blog/img-5.jpg";
import blogImg6 from "../images/blog/img-6.jpg";

import blogSingleImg1 from "../images/blog-details/img-1.jpg";
import blogSingleImg2 from "../images/blog-details/img-2.jpg";
import blogSingleImg3 from "../images/blog-details/img-3.jpg";
import blogSingleImg4 from "../images/blog-details/img-4.jpg";
import blogSingleImg5 from "../images/blog-details/img-5.jpg";
import blogSingleImg6 from "../images/blog-details/img-6.jpg";

import civica from "../images/awards/civica/banner.jpeg";
import civica_banner from "../images/awards/civica/banner_2.jpeg";

const awards = [
  {
    id: '1',
    title: '2022 CivicaPay Hackathon Winner',
    screens: civica,
    description: 'First place achieved among more than 50 teams and 16 universities in Medellin in the Hackathon CivicaPay 2022. \nThe idea was to add more value to the existing application created by the Medellin Metro (CivicaPay). In short, we created an ecosystem of points among 3 main actors (Companies, Students and Non-profit Organizations), where everyone benefited either by obtaining qualified labor force, gaining experience or reducing taxes, etc. The solution was built using Flutter, Python 3, and Docker.',
    author: 'Marilou',
    location: 'Medellín',
    create_at: '25 Mar, 2022',
    blogSingleImg: civica_banner,
    comment: '35',
    blClass: 'format-standard-image',
  },
  {
    id: '2',
    title: 'Master These Awesome New Skills in May 2023',
    screens: blogImg2,
    description: 'Consectetur adipiscing elit. Purusout phasellus malesuada lectus.',
    author: 'Konal',
    location: 'Medellín',
    create_at: '13 Dec,2023',
    blogSingleImg: blogSingleImg2,
    comment: '80',
    blClass: 'format-standard-image',
  },
  {
    id: '3',
    title: 'We provide solutions growin your business',
    screens: blogImg3,
    description: 'Consectetur adipiscing elit. Purusout phasellus malesuada lectus.',
    author: 'Aliza',
    location: 'Medellín',
    create_at: '22 Dec,2023',
    blogSingleImg: blogSingleImg3,
    comment: '95',
    blClass: 'format-video',
  },
  {
    id: '4',
    title: 'Many desktop publish package editors use.',
    screens: blogImg4,
    description: 'Consectetur adipiscing elit. Purusout phasellus malesuada lectus.',
    author: 'Biry',
    location: 'Medellín',
    create_at: '13 Dec,2023',
    blogSingleImg: blogSingleImg4,
    comment: '80',
    blClass: 'format-standard-image',
  },
];

export default awards;