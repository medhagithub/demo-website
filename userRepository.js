//const { json } = require('express');
const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const repository = require("./Repository")
const scrypt = util.promisify(crypto.scrypt);
class UserRepository extends repository{
    // create id 
  //attrs = email , password

  // compare krna password for login
  async comparePasswords(saved, entered) {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to us by a user trying to sign in
    const [hashedPassword, salt] = saved.split('.');
    const hashedEntered = await scrypt(entered, salt, 128);
  
    return hashedPassword === hashedEntered.toString('hex');
  }
  async create(attrs) {
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(16).toString('hex');
    const salt1 = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await scrypt(attrs.password, salt, 128);
    const records = await this.getAll();
    const securePassword = {
      ...attrs,
      password: `${hashedPassword.toString('hex')}.${salt}`
    };
    records.push(securePassword);
    await this.writeAll(records);
    return securePassword;
  }
  }


// this was just for testing purpose 
// const test = async()=>{
//       const repo =  new UserReprository('userRepository.json')
//       //await repo.create({email: "1234@.com", password: ' password'})
//       //const user = await repo.getAll();
//       const user = repo.getOne('a4fed20a')
//       console.log(user)
  
// }
//  test();

// now we have to import the Userrepository class to other file uske 
// bhi multiple methods hai 
// frist one would be 
//module.exports = UserReprository;
//then to call this in another file we to call it 
// const UserRepository = require("./filename")
// cosnt repo = new class name fir ("filename.json") this creating a new file

module.exports = new  UserRepository('userRepository.json');
