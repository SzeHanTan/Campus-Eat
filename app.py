from flask import Flask, session, redirect, url_for, request, render_template

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Protect session data

# Sample product data
products = {
    1: {'name': 'Apple', 'price': 1.0},
    2: {'name': 'Banana', 'price': 0.5},
    3: {'name': 'Cherry', 'price': 2.0}
}

@app.route('/')
def index():
    return render_template('index.html', products=products)

@app.route('/add_to_cart/<int:product_id>', methods=['GET', 'POST'])
def add_to_cart(product_id):
    if request.method == 'POST':
        portion = request.form.get('portion')
        sauce = request.form.get('sauce')
        comment = request.form.get('comment', '')

        if 'cart' not in session:
            session['cart'] = {}

        cart = session['cart']
        # Use a unique key for items by combining product ID and customizations
        cart_key = f"{product_id}_{portion}_{sauce}_{comment}"

        if cart_key in cart:
            cart[cart_key]['quantity'] += 1
        else:
            cart[cart_key] = {
                'product_id': product_id,
                'portion': portion,
                'sauce': sauce,
                'comment': comment,
                'quantity': 1
            }

        session['cart'] = cart
        return redirect(url_for('view_cart'))
    else:
        product = products.get(product_id)
        if not product:
            return "Product not found", 404
        return render_template('add_to_cart.html', product=product)

@app.route('/view_cart')
def view_cart():
    if 'cart' not in session or not session['cart']:
        return "Your cart is empty. <a href='/'>Go back to shopping</a>."

    cart = session['cart']
    cart_items = []
    total = 0

    for cart_key, item in cart.items():
        product = products.get(item['product_id'])
        if product:
            item_total = product['price'] * item['quantity']
            total += item_total
            cart_items.append({
                'key': cart_key,
                'product': product,
                'portion': item['portion'],
                'sauce': item['sauce'],
                'comment': item['comment'],
                'quantity': item['quantity'],
                'total': item_total
            })

    return render_template('view_cart.html', cart_items=cart_items, total=total)

@app.route('/update_cart/<cart_key>', methods=['POST'])
def update_cart(cart_key):
    if 'cart' in session and cart_key in session['cart']:
        quantity = int(request.form.get('quantity', 0))
        if quantity <= 0:
            del session['cart'][cart_key]
        else:
            session['cart'][cart_key]['quantity'] = quantity
    return redirect(url_for('view_cart'))

@app.route('/remove_from_cart/<cart_key>')
def remove_from_cart(cart_key):
    if 'cart' in session and cart_key in session['cart']:
        del session['cart'][cart_key]
    return redirect(url_for('view_cart'))

if __name__ == '__main__':
    app.run(debug=True)










