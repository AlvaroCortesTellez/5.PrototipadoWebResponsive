Handlebars.registerHelper('switch', function (value, options) {
	this._switch_value_ = value;
	var html = options.fn(this);
	delete this._switch_value_;
	return html;
});
Handlebars.registerHelper('case', function (value, options) {
	if (value == this._switch_value_) {
		return options.fn(this);
	}
});
var menu = document.querySelector('#menu');
var menuItems = [
	{ 'item': 'Acerca de nosotros', 'state':'EmpresaInformacion', 'active': true },
	{ 'item': 'Costos', 'state': 'costos', 'active': false },
	{ 'item': 'Utilidades', 'state': 'Utilidades', 'active': false },
	{ 'item': 'Gastos Operacionales', 'state': 'dtGastosO', 'active': false },
	{ 'item': 'Liquidacion', 'state': 'liquidacion', 'active': false }
];
var menuContext = { menuItems };
menu.innerHTML = ProyectoFinal.menu(menuContext);
var appContent = document.querySelector('#appContent');
var blocksInfo = {
	'EmpresaInformacion': [
			{empresaName: 'Colfinanzas', contentInfo:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', enlace: 'Nuevo Link', enlaceDir:'https://www.google.com'}
		],
		'liquidacion': [
			{trabajador:"Gerente General", salario:"3,000", auxilio:"", auxilio:"", total:"3,000"},
			{trabajador:"Asistente de Gerencia", salario:"1,200", auxilio:"80.00", comision:"", total:"1,200"},
			{trabajador:"Vendedora 1", salario:"800", auxilio:"60.00", comision:"140.00", total:"1,000"},
			{trabajador:"Vendedora 2", salario:"800", auxilio:"60.00", comision:"140.00", total:"1,000"},
			{trabajador:"Supervisor", salario:"1,000", auxilio:"80.00", comision:"220.00", total:"1,300"}
		],
		'dtGastosO': [
			{clasificacion:"Gastos Administrativos", concepto:"Renta de Edificio", valor:5000},
			{clasificacion:"Gastos Operacionales", concepto:"Nómina", valor:7500},
			{clasificacion:"Gastos Operacionales", concepto:"Servicios Publicos", valor:2700},
			{clasificacion:"Gastos Operacionales", concepto:"Telefonos", valor:580},
			{clasificacion:"Gastos Administrativos", concepto:"Depreciación (muebles y enseres)", valor:1200},
			{clasificacion:"Gastos Administrativos", concepto:"Hononarios Contador", valor:3500},
			{clasificacion:"Gastos Administrativos", concepto:"Depreciación (equipos de computo)", valor:1228},
			{clasificacion:"Gastos Administrativos", concepto:"Otros gastos (aseo, cafeteria, entre otros)", valor:1000},
			{clasificacion:"Gastos Ventas", concepto:"Punto de Ventas", valor:4500},
			{clasificacion:"Gastos Ventas", concepto:"Servicios Públicos", valor:500},
			{clasificacion:"Gastos Ventas", concepto:"Nómina", valor:2200}
		],
		'Utilidades': [
			{concepto:"Ventas", unitario:"$45.00", cantidad:"2,000.00", total: "$90,000.00", periodo:"01-01-2019", porcentaje:"100%"},
			{concepto:"Menos: gastos operacionales", unitario:"$1.12", cantidad:"2,000.00", total: "$2,240.00", periodo:"01-01-2019", porcentaje:"2.49%"},
			{concepto:"Menos: costo de ventas", unitario:"$15.00", cantidad:"2,000.00", total: "$30,000.00", periodo:"01-01-2019", porcentaje:"33.33%"}
		]
};
function getStateTitle(state) {
	for (var i = 0; i < menuItems.length; i++) {
		if (menuItems[i].state === state) {
			return menuItems[i].item;
		}
	}
};
function changeState(state) {
	var appContentContext = { 'state': state, 'title': getStateTitle(state) };
	appContent.innerHTML = ProyectoFinal.content(appContentContext);
	var blocks = document.querySelectorAll('#' + state + ' .block');

	console.log(blocks);
		blocks.forEach(function (block, i) {
			console.log(state);
		switch(state){
			case 'EmpresaInformacion':
				block.innerHTML += ProyectoFinal.empresaInfo(blocksInfo[state][i])
				console.log(blocksInfo[state]);
			break;
			case 'dtGastosO':
				block.innerHTML += ProyectoFinal.tablaGastosOperacionales({gastos:blocksInfo[state]})
				console.log(blocksInfo[state]);
			break;
			case 'Utilidades':
				block.innerHTML += ProyectoFinal.utilidades({utilidades: blocksInfo[state]})
				console.log(blocksInfo[state]);
			break;
			case 'liquidacion':
				block.innerHTML += ProyectoFinal.liquidaciones({liquidacion: blocksInfo[state]})
				console.log(blocksInfo[state]);
			break;
			case 'costos':
				block.innerHTML += ProyectoFinal.costos()
			break;
		}
	});

	$('.menuLinks').removeClass('menuActive');
	$('#' + state + 'Link').addClass('menuActive');
};
changeState('costos')

$(document).ready(function() {
    $('select').material_select();
});
