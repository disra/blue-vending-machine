import random
from numpy import floor

from Product import Product
from UpdateProduct import UpdateProduct
from CoinInsert import CoinInsert
from UpdateCoinStock import UpdateCoinStock

from fastapi import APIRouter

router = APIRouter()

products = {}
coinstocks = {
    1: {
        'types': 'bank',
        'value': 1000,
        'amount': 100
    },
    2: {
        'types': 'bank',
        'value': 500,
        'amount': 50
    },
    3: {
        'types': 'bank',
        'value': 100,
        'amount': 30
    },
    4: {
        'types': 'bank',
        'value': 50,
        'amount': 100
    },
    5: {
        'types': 'bank',
        'value': 20,
        'amount': 50
    },
    6: {
        'types': 'coin',
        'value': 10,
        'amount': 10
    },
    7: {
        'types': 'coin',
        'value': 5,
        'amount': 10
    },
    8: {
        'types': 'coin',
        'value': 1,
        'amount': 10
    },
}

for i in range(1, 31):
    products[i] = {
        'name': 'Twisto' + str(i),
        'price': random.randint(1, 1000),
        'quantity': random.randint(0, 20),
    }


@router.get("/get-product")
def get_product():
    return products


@router.post("/create-product/{product_id}")
def create_product(product_id: int, product: Product):
    if product_id in products:
        return {"Error": "Product exists"}
    print(product)
    products[product_id] = product
    return products


@router.put("/update-product/{product_id}")
def update_propduct(product_id: int, updateProduct: UpdateProduct):
    if product_id not in products:
        return {"Error": "Product does not found"}

    if updateProduct.name != None:
        products[product_id]['name'] = updateProduct.name

    if updateProduct.price != None:
        products[product_id]['price'] = updateProduct.price

    if updateProduct.quantity != None:
        products[product_id]['quantity'] = updateProduct.quantity
    return products


@router.delete("/delete-product/{product_id}")
def delete_product(product_id: int):
    if product_id not in products:
        return {"Error": "Product does not found"}

    del products[product_id]
    return products


@router.get("/get-coinstocks")
def get_coinstocks():
    return coinstocks


@router.put("/update-coinstocks")
def update_propduct(updateCoinStock: UpdateCoinStock):
    for coin in updateCoinStock.coins:
        coinstocks[int(coin['id'])]['amount'] = coin['amount']
    return coinstocks


@router.post('/calculate')
def calculate(coinInsert: CoinInsert):
    price = coinInsert.productPrice
    inserted = coinInsert.coinInsert
    inserted = [coin for coin in inserted if coin['amount'] > 0]
    global coinstocks
    availableCoin = {coin: coinstocks[coin]
                     for coin in coinstocks if coinstocks[coin]['amount'] > 0}
    insertedAmount = sum(coin['value'] * coin['amount'] for coin in inserted)
    changes = insertedAmount - price
    changesInfo = []
    if insertedAmount < price:
        return {"Error": "Not enough money for purchase"}

    tempCoinStock = coinstocks
    if changes > 0:
        for coin in inserted:
            tempCoinStock[int(coin['id'])]['amount'] += coin['amount']

        for coin in availableCoin:
            changeCoin = floor(changes / availableCoin[coin]['value'])
            if changeCoin > 0:
                changeCoin = changeCoin if availableCoin[coin][
                    'amount'] >= changeCoin else availableCoin[coin]['amount']

                changes -= availableCoin[coin]['value'] * changeCoin
                tempCoinStock[coin]['amount'] -= changeCoin
                changesInfo.append([availableCoin[coin]['value'], changeCoin])

        changes = insertedAmount - price
        canGiveChange = sum(value[0]*value[1]
                            for value in changesInfo) == changes
        if not canGiveChange:
            return {"Error": "Sorry, not enough bank/coin for change. Please enter the amount according to the price of the product or cancel order."}

    coinstocks = tempCoinStock
    return coinstocks, changes, changesInfo
