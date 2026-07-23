export type Course = {
  id: number;
  name: string;
  code: string;
  credits: number;
  grade: string;
  instructor: string;
  category: string;
  description: string;
  schedule: string;
};

export const courseCatalog: Course[] = [
  {
    id: 1,
    name: 'Data Structures & Algorithms',
    code: 'CS101',
    credits: 4,
    grade: 'A',
    instructor: 'Dr. Ramesh Kumar',
    category: 'Core Computer Science',
    description: 'Build a strong foundation in problem solving, trees, graphs, and complexity.',
    schedule: 'Mon & Wed · 9:00 AM',
  },
  {
    id: 2,
    name: 'Database Management Systems',
    code: 'CS102',
    credits: 3,
    grade: 'B',
    instructor: 'Dr. Priya Nair',
    category: 'Data & Storage',
    description: 'Relational design, SQL, indexing, and transaction handling for real systems.',
    schedule: 'Tue & Thu · 11:30 AM',
  },
  {
    id: 3,
    name: 'Object Oriented Programming',
    code: 'CS103',
    credits: 4,
    grade: 'A',
    instructor: 'Dr. Meena Pillai',
    category: 'Programming',
    description: 'Practice encapsulation, inheritance, polymorphism, and clean design habits.',
    schedule: 'Mon & Fri · 1:30 PM',
  },
  {
    id: 4,
    name: 'Circuit Theory',
    code: 'EC101',
    credits: 3,
    grade: 'B',
    instructor: 'Dr. Sunil Rajan',
    category: 'Electronics',
    description: 'Understand circuit analysis, signal flow, and electrical fundamentals.',
    schedule: 'Wed & Fri · 10:15 AM',
  },
  {
    id: 5,
    name: 'Thermodynamics',
    code: 'ME101',
    credits: 3,
    grade: 'C',
    instructor: 'Dr. Latha Gopal',
    category: 'Mechanical',
    description: 'Study heat transfer, energy systems, and the laws that govern motion.',
    schedule: 'Tue & Fri · 2:00 PM',
  },
];

export const portalStats = [
  { label: 'Courses enrolled', value: '5' },
  { label: 'Average GPA', value: '3.8' },
  { label: 'Semester', value: '6' },
];