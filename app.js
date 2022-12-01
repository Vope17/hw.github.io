// get input btn id&class
let c = console.log
// const inputcontainer = document.querySelector('.input-container')
// const showup = document.getElementById('showup')
// for (let i = 1; i <= 5; i++) {
//     this['input' + i] = document.getElementById(`input${i}`);//input 1~5 getelementbyid
// }
// const btns = document.querySelectorAll('.btn')
// // btns click event
// btns.forEach(function (btn) {
//     btn.addEventListener('click', function (content) {
//         const style = content.currentTarget.classList
//         if (style.contains('Caculate')) {
//             let outcome = Caculate()
//             console.log(outcome)
//             outcome = outcome.join('')
//             showup.textContent = outcome
//         }

//         else if (style.contains('Reset')) {
//             Reset()
//         }
//         else {
//             Random()
//         }
//     })
// })

function showup(type, str, base, limit) {
    // c(str)

    if (/^0|^\+/.test(str)) {

        return '+' + parseInt(str.slice(1), base)

    }

    else {

        switch (type) {
            case '1':
                return '-' + parseInt(str.slice(1), base)
            case '2':
                return '-' + (parseInt(Ones(str.slice(1).split(''), base, limit).join(''), base))
            case '3':
                return '-' + (parseInt(Twos(str.slice(1).split(''), base, limit).join(''), base))
        }
    }

}
function Ones(array, Base) {
    let temp_array = array
    for (i = 0; i < array.length; i++) {
        temp_array[i] = parseInt(array[i], Base)
        temp_array[i] = (Base - 1 - temp_array[i]).toString(Base).toUpperCase()
    }
    return temp_array
}
function Twos(array, Base, Limit) {
    let temp_array = Ones(array, Base)

    // c((temp_array, add1('1'.split(''), Limit)), Base)
    let twos_array = TwoSum(temp_array, add1('1'.split(''), Limit - 1), Base)
    // temp_array[temp_array.length - 1] = (Number(temp_array[temp_array.length - 1]) + 1).toString(Base)

    return twos_array
}
function delsign(str, base) {
    if (/^-/.test(str))
        return str.replace(/^-/, (Number(base) - 1).toString(base))

    return str.replace(/^\+/, '0')
}
function add1(array, Limit) {
    while (array.length < Limit) {
        array.unshift('0')
    }

    return array
}
function TwoSum(arrayA, arrayB, Base) {
    // The arrayA has same length with arrayB
    count = 0
    let length = arrayA.length
    let sum = 0
    let temp_array = arrayA
    for (let i = length - 1; i >= 0; i--) {
        sum = parseInt(arrayA[i], Base) + parseInt(arrayB[i], Base) + count
        // c(parseInt(arrayA[i], Base) + parseInt(arrayB[i], Base))
        if (sum >= Base) {
            sum %= Base
            count = 1
        }
        else
            count = 0
        temp_array[i] = sum.toString(Base).toUpperCase()
    }
    c(count)
    return temp_array
}
function add0(array, Limit) {
    let sign = array[0]
    let temp_array = array
    temp_array[0] = '0'
    while (temp_array.length < Limit) {
        temp_array.unshift('0')
    }

    temp_array[0] = sign

    return temp_array
}
function Caculate(Type, Base, Limit, InputA, InputB) {
    // let Type = input1.value
    // let Base = input2.value
    // let Limit = input3.value
    // let InputA = input4.value
    // let InputB = input5.value
    // vu.$data.DecA = parseInt(InputA, Base)
    // vu.$data.DecB = parseInt(InputB, Base)


    InputA = delsign(InputA, Base)
    InputB = delsign(InputB, Base)

    let A_array = InputA.split('')
    let B_array = InputB.split('')

    let Case_Choose = CaseChoose(Type, ABsign())

    A_array = add0(A_array, Limit)
    B_array = add0(B_array, Limit)


    return Outcome(Case_Choose, A_array, B_array, Base, Limit)

    // return Twos

    function Ispositive(string) {

        return string[0] === '0' ? true : false
    }
    function ABsign(A = Ispositive(InputA), B = Ispositive(InputB)) {
        if (A === B && A === true && B === true)
            return '1'
        else if (A !== B)
            return '2'
        else
            return '3'
    }
    function CaseChoose(Type, ABsign) {
        switch (Type) {
            case '1':
                switch (ABsign) {
                    case '1':
                        return '1'
                    case '2':
                        return '2'
                    case '3':
                        return '1'

                }
            case '2':
                switch (ABsign) {
                    case '1':
                        return '3'
                    case '2':
                        return '4'
                    case '3':
                        return '5'
                }
            case '3':
                switch (ABsign) {
                    case '1':
                        return '3'
                    case '2':
                        return '6'
                    case '3':
                        return '7'
                }

        }
    }

}

function Outcome(Case_Choose, A_array, B_array, Base, Limit) {


    switch (Case_Choose) {
        case '1': {
            //只取大小做相加
            c('now case1')
            let sum = []
            A_slice_array = A_array.slice(1)
            B_slice_array = B_array.slice(1)
            sum = TwoSum(A_slice_array, B_slice_array, Base)
            //判斷是否溢位
            c(count)
            if (count === 1) {
                sum.unshift((Base - 1).toString(Base).toUpperCase())
                vu.error = true
                return sum
            }

            sum.unshift(A_array[0])
            return sum
        }
        case '2': {
            //將A的大小 與 B的大小取1's 相加
            c('now case2')
            let sum = []
            // let array = ['1']
            // let add1_array = add1(array, Limit)
            A_slice_array = A_array.slice(1)
            B_slice_array = B_array.slice(1)
            B_slice_array = Ones(B_slice_array, Base)
            sum = TwoSum(A_slice_array, B_slice_array, Base)

            if (count === 1) {

                sum = TwoSum(sum, add1('1'.split(''), Limit - 1), Base)
                sum.unshift(A_array[0])

            }
            else {
                sum = Ones(sum, Base)
                sum.unshift(B_array[0])

            }
            return sum
        }
        case '3': {
            //輸入為b-1補數

            //連同符號位元一起相加
            c('now case3')
            let sum = []
            sum = TwoSum(A_array, B_array, Base)

            //判斷是否溢位 
            if (sum[0] !== '0')
                vu.error = true

            return sum
        }
        case '4': {
            //輸入為b-1補數
            c('now case4')
            let sum = []
            sum = TwoSum(A_array, B_array, Base)
            if (count === 1) {
                sum = TwoSum(sum, add1('1'.split(''), Limit), Base)
            }
            return sum

        }
        case '5': {
            //輸入為b-1補數
            c('now case5')
            let sum = []
            sum = TwoSum(A_array, B_array, Base)
            c(add1('1'.split(''), Limit))
            sum = TwoSum(sum, add1('1'.split(''), Limit), Base)

            if (sum[0] !== B_array[0]) {
                vu.error = true
            }
            return sum

        }
        case '6': {
            //輸入為b補數
            c('now case6')
            let sum = []
            sum = TwoSum(A_array, B_array, Base)
            if ((sum[0] === '0' && count === 1) || (sum[0] !== '0' && count === 0)) {
                return sum
            }
            else {
                vu.error = true
                return sum
            }
        }
        case '7': {
            //輸入為b補數
            c('now case7')
            let sum = []

            sum = TwoSum(A_array, B_array, Base)
            c(count)
            if (sum[0] !== B_array[0]) {
                vu.error = true
                return sum
            }
            else {
                return sum
            }
        }
    }
}

Vue.config.productionTip = false;
const vu = new Vue({
    el: '.vue',
    data: {

        Type: '1',
        Base: '2',
        Limit: '4',
        A: '0010',
        B: '0100',
        error: false,
        types: [1, 2, 3],
        bases: [2, 8, 10, 16],

    },
    methods: {

        random() {
            Random()
        },
        reset() {
            this.Type = '1'
            this.Base = '2'
            this.Limit = '4'
            this.A = '0001'
            this.B = '0110'
        },
        trycatch() {
            try {

            } catch (e) {

            }

        }

    },
    computed: {
        result() {
            this.error = false
            let text = '^' + (this.Base - 1).toString(this.Base).toUpperCase() + '|^0|^-|^\\+'
            let reg = new RegExp(text)




            if (reg.test(this.A) && reg.test(this.B))
                return Caculate(this.Type, this.Base, this.Limit, this.A, this.B).join('')
            else
                return '非標準輸入格式'


        },
        DecA() {
            return showup(this.Type, this.A, this.Base, this.Limit)
        },
        DecB() {

            return showup(this.Type, this.B, this.Base, this.Limit)
        },
        Dec_result() {

            return showup(this.Type, this.result, this.Base, this.Limit)
        },


    },

})
function Random() {
    let base = [2, 8, 10, 16]
    let temp_type = Math.floor(Math.random() * 3 + 1).toString()
    vu.$data.Type = temp_type
    let temp_base = base[Math.floor(Math.random() * 4)].toString()

    vu.$data.Base = temp_base
    let temp = Math.floor(Math.random() * 9 + 2).toString()
    vu.$data.Limit = temp
    let temp_arrayA = []
    let arr = [0, Number(temp_base - 1).toString(temp_base).toUpperCase()]
    for (let i = 0; i < temp - 1; i++) {
        temp_arrayA.unshift(Math.floor(Math.random() * temp_base).toString(temp_base).toUpperCase())
    }
    temp_arrayA.unshift(arr[Math.floor(Math.random() * 2)])
    vu.$data.A = temp_arrayA.join('')

    let temp_arrayB = []
    for (let i = 0; i < temp - 1; i++) {
        temp_arrayB.unshift(Math.floor(Math.random() * temp_base).toString(temp_base).toUpperCase())
    }
    temp_arrayB.unshift(arr[Math.floor(Math.random() * 2)])
    vu.$data.B = temp_arrayB.join('')


}
