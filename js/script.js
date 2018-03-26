const app = new Vue({
  el: '#app',
  data: {
    products: defaultData.products,
    categories: defaultData.cats,
    filteredCategories: null,
    filteredPrice: null,
    shopCart: [],
    showCart: false,
  },
  computed: {
    getSumCaart() {
      let sum = 0;
      this.shopCart.forEach(element => {
        sum += element.qty * parseFloat(element.price);
      });
      return sum.toFixed(2);
    },
    getProducts() {
      let products = [];
      let filteredCategories = parseInt(this.filteredCategories);
      let filteredPrice = parseInt(this.filteredPrice);

      products = this.products.filter(dish => {
          return (!filteredCategories || dish.cid === filteredCategories) &&
          (!filteredPrice || dish.price <= filteredPrice);
      });

      return products;
    }
  },
  methods: {
    addDish(dish) {
      let id = parseFloat(dish.id);
      let qty = parseInt(this.$refs['qty' + id][0].value);

      for (let item of this.shopCart) {
        if (item.id === dish.id) {
          //console.log(item);
          item.qty += qty;
          this.$refs['qty' + id][0].value = 1;
          return false;
        }
      }
      this.shopCart.push({
        ...dish,
        qty
      });
      this.$refs['qty' + id][0].value = 1;
    },
    delDish(order) {
      this.shopCart = this.shopCart.filter(el => el.id !== order.id);
    },
    addQtyinCart(order) {
      if (order.qty > 1) {
        this.shopCart.forEach(ord => ord.id === order.id ? --ord.qty : false);
      } else {
        this.delDish(order);
      }
    }
  }
})