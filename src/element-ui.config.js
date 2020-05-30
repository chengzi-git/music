import {
    Button,
    Input,
    Carousel,
    CarouselItem,
    Loading,

} from 'element-ui'

let arr = [
    Button,
    Input,
    Carousel,
    CarouselItem,
    Loading,
]

export default function (Vue) {
    arr.forEach(Component => Vue.use(Component))
}

