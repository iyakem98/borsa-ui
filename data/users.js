import bcrypt from 'bcryptjs'
const users = [
    {
        firstName: 'Iyakem',
        lastName: 'Estifanos',
        userName: 'iyu98',
        email: 'iyu@iyu.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        
    },

    {
        firstName: 'Semra',
        lastName: 'Estifanos',
        userName: 'semra01',
        email: 'semra@semra.com',
        password: bcrypt.hashSync('123456', 10),
        isTraveler: true,
        city: "Los Angeles",
        country: "USA"
        
    },

    {
        firstName: 'Abayneh',
        lastName: 'Estifanos',
        userName: 'Abay01',
        email: 'abay@abay.com',
        password: bcrypt.hashSync('123456', 10),
        city: "New York",
        country: "USA",
        isTraveler: true
        
    },

    {
        firstName: 'Liz',
        lastName: 'Amde',
        userName: 'Liz01',
        email: 'liz@liz.com',
        password: bcrypt.hashSync('123456', 10),
        
        
    },

    {
        firstName: 'Henock',
        lastName: 'Teshale',
        userName: 'Heni98',
        email: 'heni@heni.com',
        password: bcrypt.hashSync('123456', 10),
        
        
    },

    {
        firstName: 'Tomas',
        lastName: 'Tsega',
        userName: 'Tom95',
        email: 'tom@tom.com',
        password: bcrypt.hashSync('123456', 10),
        isTraveler: true,
        city: "Seattle",
        country: "USA"
        
        
    },

    {
        firstName: 'Daniel',
        lastName: 'Amde',
        userName: 'danny01',
        email: 'danny@danny.com',
        password: bcrypt.hashSync('123456', 10),
        isTraveler: true,
        city: "Los Angeles",
        country: "USA"
        
        
    },

    {
        firstName: 'Kidist',
        lastName: 'Amde',
        userName: 'kidi01',
        email: 'kidi@kidi.com',
        password: bcrypt.hashSync('123456', 10),
        isTraveler: true,
        
        
    },

    {
        firstName: 'Wendi',
        lastName: 'Amde',
        userName: 'wendi01',
        email: 'wendi@wendi.com',
        password: bcrypt.hashSync('123456', 10),
        isTraveler: true,
        city: "Chicago",
        country: "USA"
        
        
    },

    {
        firstName: 'John',
        lastName: 'Doe',
        userName: 'john01',
        email: 'john@john.com',
        password: bcrypt.hashSync('123456', 10),
        isTraveler: true,
        city: "London",
        country: "UK"
        
        
    },

    {
        firstName: 'Luna',
        lastName: 'Estifanos',
        userName: 'luna12',
        email: 'luna@luna.com',
        password: bcrypt.hashSync('123456', 10),
        city: "Cancun",
        country: "Mexico",
        
        
    },
    {
        firstName: 'Polo',
        lastName: 'Estifanos',
        userName: 'polo12',
        email: 'polo@polo.com',
        password: bcrypt.hashSync('123456', 10),
        city: "Frankfurt",
        country: "Germany",
        
        
    },
    {
        firstName: 'Jenny',
        lastName: 'Estifanos',
        userName: 'jenny12',
        email: 'jenny@jenny.com',
        password: bcrypt.hashSync('123456', 10),
        city: "Nairobi",
        country:  "Kenya"
        
        
    },
    {
        firstName: 'Victor',
        lastName: 'Mahmoud',
        userName: 'victor01',
        email: 'victor@victor.com',
        password: bcrypt.hashSync('123456', 10),
        city: "Kano",
        country: "Nigeria"

        
        
    },

]

export default users