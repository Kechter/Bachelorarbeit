ngOnInit() {
    this.supabaseService.getCart(this.userId).subscribe((cart: any) => {
      this.cart = cart;
      this.calculateTotal();
    });
}

calculateTotal() {
    ...
    response.forEach((item) => {
        this.supabaseService.getProductById(item.product_id).subscribe({
            next: (products) => {
                if (products.length > 0) {
                    total += products[0].price * item.quantity;
                }
            },
            complete: () => {
                ...
                this.totalPrice = parseFloat(total.toFixed(2));
            }
        });
    });
}

goToCart() {
    this.router.navigate(['/cart-page']);
}
goToProducts() {
    this.router.navigate(['/products']);
}