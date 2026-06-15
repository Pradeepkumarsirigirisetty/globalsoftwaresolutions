import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const courses = [
  { name: 'Computer Basics', category: 'Computer Fundamentals', description: 'Learn the foundational concepts of computers, operating systems, and basic digital literacy.', duration: '1 Month', level: 'Beginner', syllabus: ['Introduction to Computers', 'Hardware Components', 'Windows OS', 'Internet Basics', 'Email & Communication'], careerPaths: ['Data Entry Operator', 'Office Assistant'], eligibility: '10th Pass' },
  { name: 'DCA', category: 'Computer Fundamentals', description: 'Diploma in Computer Applications covering MS Office, Internet, and basic programming.', duration: '6 Months', level: 'Beginner', syllabus: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Internet & Email', 'Computer Fundamentals', 'Typing'], careerPaths: ['Office Administrator', 'Data Entry Operator', 'Computer Operator'], eligibility: '10th Pass' },
  { name: 'PGDCA', category: 'Computer Fundamentals', description: 'Post Graduate Diploma in Computer Applications for advanced computer skills.', duration: '1 Year', level: 'Intermediate', syllabus: ['Advanced MS Office', 'Database Management', 'Programming Basics', 'Web Technology', 'Tally', 'Project Work'], careerPaths: ['Software Developer', 'System Analyst', 'IT Administrator'], eligibility: 'Graduation' },
  { name: 'DTP', category: 'Computer Fundamentals', description: 'Desktop Publishing course covering PageMaker, CorelDraw and publishing tools.', duration: '3 Months', level: 'Beginner', syllabus: ['CorelDraw', 'PageMaker', 'Photoshop Basics', 'Print Design', 'Typography'], careerPaths: ['Graphic Designer', 'Print Designer', 'Layout Artist'], eligibility: '10th Pass' },
  { name: 'Typing', category: 'Computer Fundamentals', description: 'Telugu and English typing course for government job aspirants and office professionals.', duration: '2 Months', level: 'Beginner', syllabus: ['English Typing', 'Telugu Typing', 'Speed Building', 'Accuracy Training'], careerPaths: ['Typist', 'Data Entry Operator', 'Government Jobs'], eligibility: '10th Pass' },
  { name: 'C Language', category: 'Programming', description: 'Foundation programming course in C language covering data structures and algorithms.', duration: '2 Months', level: 'Beginner', syllabus: ['C Basics', 'Data Types', 'Control Structures', 'Functions', 'Pointers', 'File Handling'], careerPaths: ['Junior Developer', 'Systems Programmer'], eligibility: '12th Pass' },
  { name: 'C++', category: 'Programming', description: 'Object-oriented programming with C++ including classes, inheritance, and polymorphism.', duration: '2 Months', level: 'Intermediate', syllabus: ['OOP Concepts', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Templates', 'STL'], careerPaths: ['Software Developer', 'Game Developer'], eligibility: 'C Language Knowledge' },
  { name: 'Java', category: 'Programming', description: 'Java programming from basics to advanced including Core Java and Java applications.', duration: '3 Months', level: 'Intermediate', syllabus: ['Java Basics', 'OOP in Java', 'Collections', 'Exception Handling', 'File I/O', 'JDBC'], careerPaths: ['Java Developer', 'Backend Developer', 'Android Developer'], eligibility: '12th Pass' },
  { name: 'VB (Visual Basic)', category: 'Programming', description: 'Visual Basic programming for Windows application development.', duration: '2 Months', level: 'Beginner', syllabus: ['VB Basics', 'Forms & Controls', 'Event-Driven Programming', 'Database Connectivity', 'Reports'], careerPaths: ['Application Developer', 'Database Developer'], eligibility: '12th Pass' },
  { name: 'MS Office', category: 'Office Productivity', description: 'Complete Microsoft Office suite training including Word, Excel, PowerPoint and Access.', duration: '2 Months', level: 'Beginner', syllabus: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Access', 'MS Outlook'], careerPaths: ['Office Manager', 'Administrative Assistant', 'Data Analyst'], eligibility: 'Computer Basics' },
  { name: 'Tally', category: 'Office Productivity', description: 'Tally ERP 9 and TallyPrime for accounting, GST, and financial management.', duration: '2 Months', level: 'Beginner', syllabus: ['Company Creation', 'Accounting Vouchers', 'GST Setup', 'Inventory Management', 'Reports & Analysis'], careerPaths: ['Accountant', 'Finance Manager', 'GST Practitioner'], eligibility: 'Commerce Background' },
  { name: 'Photoshop', category: 'Design', description: 'Adobe Photoshop for photo editing, digital art, and graphic design.', duration: '2 Months', level: 'Beginner', syllabus: ['Photoshop Interface', 'Selection Tools', 'Layers & Masks', 'Photo Retouching', 'Digital Art', 'Print Design'], careerPaths: ['Graphic Designer', 'Photo Editor', 'Digital Artist'], eligibility: 'Computer Basics' },
  { name: 'AutoCAD', category: 'Design', description: '2D and 3D computer-aided design with AutoCAD for engineering and architecture.', duration: '3 Months', level: 'Intermediate', syllabus: ['AutoCAD Interface', '2D Drawing', 'Editing Commands', '3D Modeling', 'Plotting & Printing'], careerPaths: ['CAD Draftsman', 'Civil Engineer Assistant', 'Mechanical Designer'], eligibility: '12th Pass (Science/Math)' },
  { name: 'Oracle', category: 'Database', description: 'Oracle database management including SQL, PL/SQL, and database administration.', duration: '3 Months', level: 'Intermediate', syllabus: ['SQL Basics', 'Advanced SQL', 'PL/SQL', 'Stored Procedures', 'Database Design', 'Administration'], careerPaths: ['Database Administrator', 'SQL Developer', 'Data Analyst'], eligibility: 'Programming Knowledge' },
  { name: 'Hardware & Networking', category: 'Hardware', description: 'Computer hardware assembly, troubleshooting, and network configuration.', duration: '3 Months', level: 'Beginner', syllabus: ['Computer Components', 'Assembly & Disassembly', 'OS Installation', 'Networking Basics', 'LAN/WAN Setup', 'Troubleshooting'], careerPaths: ['Hardware Engineer', 'Network Administrator', 'IT Support'], eligibility: '10th Pass' }
];

const testimonials = [
  { name: 'Ravi Kumar', course: 'DCA', message: 'Global Software Solutions gave me the skills to get my first job. The trainers are very patient and teach very practically.', rating: 5 },
  { name: 'Lakshmi Devi', course: 'Tally', message: 'I completed Tally course here and now working as an accountant. Affordable fees and excellent teaching!', rating: 5 },
  { name: 'Suresh Reddy', course: 'Hardware & Networking', message: 'Best institute in Chodavaram area. Got placed as Hardware Engineer after completing the course.', rating: 5 },
  { name: 'Priya Naidu', course: 'Photoshop', message: 'Creative and practical training. Learned Photoshop from scratch and now freelancing.', rating: 4 },
  { name: 'Venkat Rao', course: 'Java', message: 'Very good programming training. The faculty explains each concept clearly with real examples.', rating: 5 },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@globalsoftware.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const adminName = process.env.ADMIN_NAME || 'Super Admin';

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: { name: adminName, email: adminEmail, password: hashedPassword, role: 'admin' }
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log('ℹ️  Admin user already exists');
  }

  // Seed courses
  for (const course of courses) {
    const slug = course.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await prisma.course.findUnique({ where: { slug } });
    if (!existing) {
      await prisma.course.create({ data: { ...course, slug } });
      console.log(`✅ Course created: ${course.name}`);
    }
  }

  // Seed testimonials
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`✅ ${testimonials.length} testimonials created`);
  }

  // Seed site settings
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({ data: {} });
    console.log('✅ Site settings initialized');
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
