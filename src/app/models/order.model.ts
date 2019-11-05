import { Product } from './product.model';
import { Table } from './table.model';

export class Order {
	id: any;
	product: Product;
	quantityOrdered: any;
	quantityDelivered: any;
	totalAmount: any;
	table: Table;

	constructor(id, product, quantityOrdered, quantityDelivered, table =  null){
		this.id = id;
		this.product = product;
		this.quantityOrdered = quantityOrdered;
		this.quantityDelivered = quantityDelivered;
		this.totalAmount = parseInt((product.prix).trim()) *  quantityOrdered;
		this.table = table;
	}

}