
export const cmpVersions = (oldVer, newVer) => {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (let i = 0; i < newParts.length; i++) {
        const a = ~~newParts[i] // parse int
        const b = ~~oldParts[i] // parse int
        if (a > b) return true
        if (a < b) return false
    }
    return false
}
export const hardCopy = (data) => {
    return JSON.parse(JSON.stringify(data))
}
export const convertToNumberType = (value) => {
    if(!isNaN(Number(value))){
        return Number(value)
    } else {
        return 0
    }
}
export const arraysEqual = (a, b) => {
    a = a.sort();
    b = b.sort();
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
export const generateCardId = (): number => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const getDefaultCartProduct = (product , version = null): any  =>{
    let sizes_count = 0;
    if (product) {
        sizes_count += product.is_small ? 1 : 0
        sizes_count += product.is_regular ? 1 : 0
        sizes_count += product.is_large ? 1 : 0
    }
    if (!product.id || !product.category) {
        throw new Error('Invalid product')
    }
    return {
        cartId: generateCardId(),
        id: product?.id,
        alt_name : product?.alt_name,
        name: product?.name,
        image_url: product?.image_url,
        description: product?.description,
        is_small: product?.is_small,
        is_regular: product?.is_regular,
        is_large: product?.is_large,
        dinein_class : product && product.dinein_class ? product.dinein_class : [],
        dinein_class_data : product && product.dinein_class_data ? product.dinein_class_data : null,
        discount: product && product.discount ? product.discount : 0,
        all_you_can_eat_price : product && product.all_you_can_eat_price && product.all_you_can_eat_price != '' ? product.all_you_can_eat_price : 0,
        kitchen_printers: product?.kitchen_printers,
        label_printers: product?.label_printers,
        sizes_count: sizes_count,
        large_price: product ? product.large_price : 0,
        regular_price: product ? product.regular_price : 0,
        tax: product && product.tax  ? product.tax : (product && product.category ? product.category.tax : 0),
        category: product && product.category ? product.category : {},
        categoryId: product && product.category && product.category.id ? product.category.id : null,
        is_per_weight: product && product.is_per_weight ? product.is_per_weight : 0,
        weight: product && product.weight ? product.weight : null,
        sku: product && product.sku ? product.sku : '',
        actual_weight: product && product.weight ? product.weight : '',
        is_exclude_discount: product && product.is_exclude_discount ? product.is_exclude_discount : 0,
        actual_rate: product ? (product.discount_price !== null && product.discount_price.length!=0  && product.discount_show ? product.discount_price : product.price) : 0,
        current_weight: 0,
        quantity: 1,
        total_price: 0,
        void_id: 0,
        on_the_house: 0,
        houseQty: 0,
        size: [],
        comment: null,
        commentOpen: false,
        serve_type: null,
        statiege_id_deposite : product && product.statiege_id_deposite ? product.statiege_id_deposite : 0,
        supplements: [],
        is_euro_discount: 0,
        splitPaidOrOld: 0,
        version: version,
        piecesName: product && product.is_al_a_carte && product.total_pieces > 0 ?' '+ product.total_pieces + ' Pcs' : null,
        isTransfer: 0,
        operations: []
    }
}
export const isExistElementLocalStorage = (key: string) => {
    try {
        return (!(localStorage.getItem(key) == null || localStorage.getItem(key) == undefined || localStorage.getItem(key) == ''));
    } catch (e) {
        console.error('Error getting data from localStorage', e);
        return false;
    }
}

export const getItemLocalStorage = (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.error('Error getting data from localStorage', e);
        return null;
    }
}

export const setItemLocalStorage = (key: string, value: any): void => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error('Error saving to localStorage', e);
    }
}
export const removeItemLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Error occurred while removing item from localStorage', e);
    }
}
export const addCurrenDataToAllDataIfNotExist = (currentData , allData , field) =>{
    if (currentData && allData){
        const index = allData.findIndex(user => user[field] == currentData[field]);
        if (index == -1){
            allData.push(currentData);
        }
    }
   allData = Array.from(new Set(allData));
}
export const convertMinToHour = (mins:any) =>{
    mins = parseInt(mins.toFixed(2),10);
    let h:any = Math.floor(mins / 60);
    let m:any = (mins % 60);
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
}
export const generateValidationSteps = (currentProduct) => {
    let cartProductValidationSteps = [];
    let newSteps: any = [];
    const newSteps2: any = [];
    if (!currentProduct.not_available) {
        if (currentProduct.size == 1 && (currentProduct.is_small || currentProduct.is_regular || currentProduct.is_large)) {
            newSteps.push({
                stepName: "size",
                isValid: false,
                isOpen: false,
                isTouched: false,
                isRequired: true,
                isMulti: false,
                ayceFree: currentProduct.ayce_free_product,
            })
        }
        if (currentProduct.is_serve_type == 1) {
            newSteps.push({
                stepName: "hot-cold",
                isValid: false,
                isOpen: false,
                isTouched: false,
                isRequired: true,
                isMulti: false,
                ayceFree: currentProduct.ayce_free_product,
            })
        }
        if (currentProduct && currentProduct.sub_category) {
            currentProduct.sub_category.map((subCat: any) => {
                // subCat.translates?.map((translate: any) => {
                //     if(translate.locale == this.common.language && translate.field_name == "name"){
                //         subCat.name = translate.text ? translate.text : subCat.name;
                //     }
                // })
                const currentSubCatStep = {
                    stepName: subCat.name,
                    isValid: false,
                    isOpen: false,
                    isTouched: false,
                    isRequired: true,
                    isMulti: false,
                    isEditMode: false,
                    isFree: false,
                    ayceFree: false,
                    isAllowQuantity: false,
                    isSelectedDefault: false,
                    isDisplayDeselect:false,
                    isMaxSelect: 0,
                    stepId: subCat.id,
                    products: []
                };
                currentSubCatStep.isRequired = !!subCat.is_required;
                currentSubCatStep.isMulti = !!subCat.is_multi_select;
                currentSubCatStep.isFree = subCat.is_free == 1;
                currentSubCatStep.ayceFree = currentProduct.ayce_free_product;
                currentSubCatStep.isMaxSelect = subCat.max_select;
                currentSubCatStep.isAllowQuantity = subCat.allow_quantity == 1;
                currentSubCatStep.isSelectedDefault = subCat.selected_by_default == 1;
                currentSubCatStep.isDisplayDeselect = subCat.display_deselected == 1;
                currentSubCatStep.products = subCat.products != null ? subCat.products : [];
                currentSubCatStep.products.map((item: any) => {
                    item.isSelected = item.is_out_of_stock != 1 ? currentSubCatStep.isSelectedDefault : false;
                    item.isDeselected = 0;
                    item.quantity = 1;
                    item.image = item.image ? item.image : 'https://eatcard.s3.eu-central-1.amazonaws.com/assets/no_image.png';
                    // item.price = item.price && !this.currentProduct.ayce_free_product ? item.price : 0;
                });
                if (currentSubCatStep.isSelectedDefault) {
                    currentSubCatStep.isValid = true;
                }
                if (currentSubCatStep.isRequired) {
                    newSteps2.unshift(currentSubCatStep);
                } else {
                    currentSubCatStep.isValid = true;
                    newSteps2.push(currentSubCatStep);
                }
            })
        }
        newSteps = [...newSteps, ...newSteps2];
        //set first step open
        if (newSteps && newSteps.length > 0) {
            newSteps[0].isOpen = true;
            newSteps[0].isTouched = false;
            newSteps[0].isEditMode = true;
            cartProductValidationSteps = newSteps;
        }
    }
    return cartProductValidationSteps;
}
export const checkProductSimilar = (productA , productB) =>{
    return !!(((productA.on_the_house && productB.on_the_house) || (!productA.on_the_house && !productB.on_the_house)) &&
        (productB.is_euro_discount == productA.is_euro_discount) &&
        ((productB.comment && productA.comment && productB.comment == productA.comment) || (!productA.comment && !productB.comment)) &&
        productB.discount == productA.discount && productB.void_id == productA.void_id && productB.id == productA.id && !productB.is_per_weight &&
        JSON.stringify(productA.size) === JSON.stringify(productB.size) &&
        JSON.stringify(productA.supplements) === JSON.stringify(productB.supplements) && productA.serve_type === productB.serve_type);
}
export const getTimeAsNumberOfMinutes = (time)  => {
    const timeParts = time ? time.split(':') : [];
    return (parseInt(timeParts[0], 10) * 60) + parseInt(timeParts[1], 10);
}
export const parseSupplementsKDS = (item) => {
    item.forEach( datas => {
        datas.pin = false;
        datas.loader = false;
        datas.near = false;
        datas.delay = false;
        if (datas.type && datas.type === 'round_order') {
            datas.showDone = false;
            datas.order.map(rounds => {
                rounds.delay = false;
                rounds.loader = false;
                rounds.order_item.map( items => {
                    items.loader = false;
                });
            });
        } else if (datas.type && datas.type === 'normal_order') {
            datas.order_items.forEach( items => {
                try {
                    items.extra = JSON.parse(items.extra);
                } catch (e) {
                    items.extra = {serve_type: '', size: [], supplements: [], users: []};
                }
                items.loader = false;
            });
        }
    });
    return item;
}

// used to get unique objects of an array according to key.
export const  getUniqueArrayBasedOnKey = (data, key) => {
    return [...data.reduce((a, c) => {
        a.set(c[key], c);
        return a;
    }, new Map()).values()];
}

// used to get only number from the input key
export const allowOnlyNumberFromInputKey = (key) => {
    const value = Number(key.key)
    return !isNaN(value) ? !isNaN(value) : key.which == 8
}

// used to trim string till desired length
export const trimString = (string, length) => {
    return string.length > length ?
        string.substring(0, length):
        string;
}

// used to check whether the mobile browser is safari or not
export const isMobileSafari = () => {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
}

// used to update the array based on desired key
export const updateArrayBasedOnKey = (key , allProduct , currentProduct) => {
    const index = allProduct.findIndex(pro => pro[key] != undefined && currentProduct[key] != undefined && pro[key] == currentProduct[key]);
    if (index > -1) {
        allProduct[index] = currentProduct;
    }
    return allProduct;
}
