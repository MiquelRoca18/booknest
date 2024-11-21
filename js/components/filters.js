
const $ = el => document.querySelector(el)

export function valuesFilters(books){
    const category = $('#category')
    const rate = $('#rate')
    const format = $('#format')
    const price = $('#price')
    const arrayCategories = []
    const arrayRates = []
    const arrayFormats = []
    const arrayPrices = []

    books.forEach(book => {
        arrayCategories.push(`${book.volumeInfo?.categories[0]}`)
        arrayRates.push(`${book.volumeInfo?.categories[0]}`)
        arrayFormats.push(`${book.volumeInfo?.categories[0]}`)
        arrayPrices.push(`${book.volumeInfo?.categories[0]}`)
    })

    //Eliminar categorias repetidas
    const resultArrayCategories = arrayCategories.filter((item,index)=>{
        return arrayCategories.indexOf(item) === index;
    })
    //Poner categorias en select
    resultArrayCategories.forEach(categoryOption => {
        const newOptionCategory = new Option(categoryOption)
        category.options.add(newOptionCategory)
    })

    console.log(resultArrayCategories)
}
