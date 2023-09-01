const fs = require('fs');
const path = require('path');
const listPath = [];

function traverseDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      listPath.push(fullPath);
    }
  });
}

function getFullPath(dir) {
  traverseDir(dir);
  return listPath;
}

function generateRandomString(lengthCharacter) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < lengthCharacter; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function normalizePhone(phone) {
  phone = String(phone).trim();
  if (phone.startsWith('+62')) {
    phone = '0' + phone.slice(3);
  } else if (phone.startsWith('62')) {
    phone = '0' + phone.slice(2);
  }
  return testPhone(phone.replace(/[- .]/g, ''));
}

function testPhone(phone) {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return null;
  }
  return phone;
}

module.exports = {
  getFullPath,
  generateRandomString,
  normalizePhone,
};
