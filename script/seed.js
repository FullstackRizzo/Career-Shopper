const { db, models: { User, Career, Order, OrderItems } } = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // Seed users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({username: 'admin', password: 'admin', admin: true})
  ]);
  console.log(`seeded ${users.length} users`);

  // Seed products
// Seed products
const careers = await Promise.all([
  Career.create({ name: 'Physician', 
                   salary: 209000, 
                   timeOfCompletion: 11, 
                   description: 'A physician is a medical doctor who diagnoses and treats illnesses and injuries' , 
                   cost: 150000, 
                   imageUrl: 'https://www.aucmed.edu/sites/g/files/krcnkv361/files/styles/atge_3_2_crop_md/public/2021-11/large-Smile-Guy-web.jpg?h=6b55786a&itok=Wy7cQpYS',
                   category: 'Medical',
                   quantity: 25}),
  Career.create({ name: 'Architect', 
                   salary: 82000, 
                   timeOfCompletion: 8, 
                   description: 'An architect designs buildings and other structures', 
                   cost: 100000, 
                   imageUrl: 'https://alis.alberta.ca/media/697205/architect-istock-473849812.jpg',
                   category: 'Construction',
                   quantity: 25 }),
  Career.create({ name: 'Engineer', 
                   salary: 92000, 
                   timeOfCompletion: 5, 
                   description: 'An engineer uses math and science to design and develop new technology and solve problems', 
                   cost: 120000, 
                   imageUrl: 'https://i0.wp.com/www.engineeringandleadership.com/wp-content/uploads/2019/02/Engineer.png?fit=975%2C651&ssl=1',
                   category: 'Engineering',
                   quantity: 25 }),     
  Career.create({ name: 'Lawyer', 
                   salary: 120000, 
                   timeOfCompletion: 7, 
                   description: 'A lawyer provides legal advice and represents clients in court proceedings', 
                   cost: 160000, 
                   imageUrl: 'https://t3.ftcdn.net/jpg/02/90/17/72/360_F_290177221_aVWOYu245elH3WciU60sCRASZ7X23RYT.jpg',
                   category: 'Legal',
                   quantity: 25 }),
  Career.create({ name: 'Chef', 
                   salary: 50000, 
                   timeOfCompletion: 2, 
                   description: 'A chef prepares and cooks food in restaurants and other food service establishments', 
                   cost: 80000, 
                   imageUrl: 'https://www.finedininglovers.com/sites/g/files/xknfdk626/files/styles/im_square_33_fallback/public/Gordon-Ramsay.jpg?itok=6SIpVcBe',
                   category: 'Hospitality',
                   quantity: 25 }),   
  Career.create({ name: 'Teacher', 
                   salary: 57000, 
                   timeOfCompletion: 4, 
                   description: 'A teacher educates students in a variety of subjects and grade levels', 
                   cost: 60000, 
                   imageUrl: 'https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/media/images/Blog/teaching-school-administration/femaleteacher_0.jpg',
                   category: 'Education',
                   quantity: 25 }),                  
  Career.create({ name: 'Nurse', 
                   salary: 74000, 
                   timeOfCompletion: 4, 
                   description: 'A nurse provides patient care and treatment in hospitals and other medical facilities', 
                   cost: 100000, 
                   imageUrl: 'https://tm-women.org/wp-content/uploads/2017/07/nurse-791x1024.jpg',
                   category: 'Medical',
                   quantity: 25 }),
  Career.create({ name: 'Mechanic', 
                   salary: 44000, 
                   timeOfCompletion: 2, 
                   description: 'A mechanic repairs and maintains cars, trucks, and other vehicles', 
                   cost: 70000, 
                   imageUrl: 'https://www.floridacareercollege.edu/wp-content/uploads/sites/4/2020/08/12-Reasons-to-Become-an-Automotive-Mechanic-Florida-Career-College.png',
                   category: "Skilled Trades",
                   quantity: 25 }),
  Career.create({ name: 'Marketing Manager', 
                   salary: 137000, 
                   timeOfCompletion: 4, 
                   description: 'A marketing manager develops and implements marketing strategies to promote products and services', 
                   cost: 200000, 
                   imageUrl: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg',
                   category: 'Marketing',
                   quantity: 25 }),
  Career.create({ name: 'Psychologist', 
                   salary: 79000, 
                   timeOfCompletion: 8, 
                   description: 'A psychologist studies human behavior and provides therapy and counseling to individuals and groups', 
                   cost: 120000, 
                   imageUrl: 'https://pacifichealthsystems.com/wp-content/uploads/2020/11/Psychologist-san-diego.jpg',
                   category: 'Medical',
                   quantity: 0 }),
  Career.create({ name: 'Electrician', 
                   salary: 56000, 
                   timeOfCompletion: 4, 
                   description: 'An electrician installs and repairs electrical systems and equipment', 
                   cost: 80000, 
                   imageUrl: 'https://lirp.cdn-website.com/4785875f/dms3rep/multi/opt/PIC1-500x334-640w.jpg',
                   category: 'Skilled Trades',
                   quantity: 25 }),

]);

const order = await Promise.all ([
  Order.create ({
    userId: 1, completed: false, total: 0
  }),
])

const orderItems = await Promise.all([
  OrderItems.create({
    orderId: 1, careerId: 1, quantity: 1,
  }),
  OrderItems.create({
    orderId: 1, careerId: 2, quantity: 1,
  }),
])

console.log(`seeded ${order.length} orders`);
console.log(`seeded ${orderItems.length} orderItems`);
console.log(`seeded ${careers.length} products`);

console.log(`seeded successfully`);

return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    careers: {
      career1: careers[0],
      career2: careers[1]
    },
    
  };
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;