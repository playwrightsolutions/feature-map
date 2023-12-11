# feature-map

This is a bare bones test coverage feature map library. It will take a yaml file path as an input and calculate the coverage of the features in the file. This is useful for tracking coverage for UI E2E tests.

## Installation

```bash
npm install feature-map
```

## Usage

JavaScript

```javascript
const calculateYamlCoverage = require('feature-map');

calculateYamlCoverage('./featureMap.yml');
```

TypeScript

```typescript
import {calculateYamlCoverage} from 'feature-map';

calculateYamlCoverage('./test/testCoverage.yml');
```

Given the following feature map: `featureMap.yml`. NOTE: it is important to note that `page:` and `features:` are required keys. Currently the library does not support keys that differ from `features:`. Later down the road I could see adding `scenarios:` or `tests:` as a key for similar calculations.

```yaml
- page: '/auth/login'
  features:
    sign in with google: false
    email: true
    password: true
    login: true
    register your account: false
    forgot password: false
- page: '/auth/forgot-password'
  features:
    email: false
    set new password: false
- page: '/auth/register'
  features:
    first name: false
    last name: false
    date of birth: false
    address: false
    postcode: false
    city: false
    state: false
    country: false
    phone rate: false
    e-mail address: false
    password: false
    register button: false
- page: '/category/hand-tools'
  features:
    header: true
    sidebar:
      sort: false
      filters: false
      by brand: false
    product card:
      image: false
      image zoom: false
      title: false
      price: false
    pagination:
      previous: false
      next: false
      number: false
- page: '/product/{id}'
  features:
    header: false
    product details:
      image: false
      title: false
      tags: false
      price: false
      description: false
      quantity: false
      add to cart: false
      add to favorites: false
    related products:
      image: false
      title: false
      more information: false
    footer: false
```

When adding to your codebase you will get console.log() output like this:

```bash
/auth/login page has 50% coverage
/auth/forgot-password page has 0% coverage
/auth/register page has 0% coverage
/category/hand-tools page has 9.09% coverage
/product/{id} page has 0% coverage

Total Product coverage is: 64.79%
```

This will also generate the same details in a file named `coverage-output.txt`
