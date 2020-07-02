const path = require('path');
const fs = require('fs');

const p = path.join(__dirname, '..', 'data', 'card.json');

class Card {


    static async add(course) {
        const card = await Card.fetch();
        const index = card.courses.findIndex(c => c.id === course.id);
        const candidate = card.courses[index];

        if(candidate) {
            candidate.count++;
            card.courses[index] = candidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if(err) {
                    reject(err);
                } 
                else {
                    resolve();
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, data) => {
                if(err) {reject(err)
                } else {
                    resolve(JSON.parse(data));
                }
            });
        })
    }
}

module.exports = Card;