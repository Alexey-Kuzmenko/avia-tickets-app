const letters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
const numbers = '12345678910'

class ID {
    constructor(letters, numbers) {
        this.letters = letters.split('')
        this.numbers = numbers.split('')
        this._idLength = 5
    }

    createID() {
        let id = '$'

        for (let i = 0; i < this._idLength; i++) {
            id += this.letters[Math.floor(Math.random() * this.letters.length)]
                + this.numbers[Math.floor(Math.random() * this.numbers.length)]
        }

        return id

    }

    get idLength() {
        return this._idLength
    }

    set idLength(length) {
        this._idLength = length
    }

}

const id = new ID(letters, numbers);
id._idLength = 10

export default id