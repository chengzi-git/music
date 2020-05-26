import {
    Button,
    Input,
    Carousel,
    CarouselItem
} from 'element-ui'

let arr = [
    Button,
    Input,
    Carousel,
    CarouselItem
]

export default function (Vue) {
    arr.forEach(Component => Vue.use(Component))
}

