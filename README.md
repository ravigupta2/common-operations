
# Common Operations

It can be used for your Common Operations which are there and some project specfic Operations are there and this is not based on any framework , you can use this package with any frontend javascript based framework.


## Installation

Install  package with npm

```bash
  npm install common-operations
```

## Usage/Examples

```javascript
import { generateValidationSteps} from 'common-operations'

function Steps() {
  const validationSteps = generateValidationSteps();
}
```


## Operations present

| Function                           | Operation                                                                             | Prams                                    |
|------------------------------------|---------------------------------------------------------------------------------------|------------------------------------------|
| `cmpVersions`                      | compare two versions and return greater one                                           | `a and b`                                |
| `hardCopy`                         | Does hardCopy and Does not keep old reference                                         | `data`                                   |
| `convertToNumberType`              | convert data to number if in proper format else 0                                     | `data`                                   |
| `arraysEqual`                      | check similarity of two array and return in boolean                                   | `a and b`                                |
| `generateCardId`                   | generate 6 digit unique number for cart id                                            | none                                     |
| `getDefaultCartProduct`            | generate cart modal and version field as optional                                     | `product , version? = null`              |
| `isExistElementLocalStorage`       | check existance of element in local storage and return boolean                        | `key`                                    |
| `getItemLocalStorage`              | get item based on key from localstorage                                               | `key`                                    |
| `setItemLocalStorage`              | set item in local storage                                                             | `key and value`                          |
| `removeItemLocalStorage`           | remove item from local storage based on key                                           | `key`                                    |
| `addCurrenDataToAllDataIfNotExist` | add current data to all data based on filed for comparison and removed duplicate item | `current  , all , filed for comparision` |
| `convertMinToHour`                 | comvert mminutes to HH:MM                                                             | `minutes`                                |
| `generateValidationSteps`          | generate validatons steps for cart product                                            | `product`                                |
| `checkProductSimilar`              | compare two prduct and check if they are similar or not (POS style)                   | `a and b`                                |
| `getTimeAsNumberOfMinutes`         | convert time from HH:MM to number of minutes                                          | `time`                                   |
| `parseSupplementsKDS`              | parse supplement item in kds format                                                   | `data`                                   |

## Tech Stack

javascript , typescript


## Badges


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Authors

- [@ravigupta2](https://www.github.com/ravigupta2)


## 🚀 About Me
# Hi, I'm Ravi! 👋
I'm a frontend developer...
More to come soon


## 🛠 Skills
Javascript, HTML, CSS , angular , node , electron  , scss ...

## Feedback

If you have any feedback  , suggestion , please reach out to us at rrsv.gupta@gmail.com
 
