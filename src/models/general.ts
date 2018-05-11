export class Country {
	ID: number;
	ParentID: number;
	Parent: string;
	Nome: string;
	NomeCompleto: string;
};

export class Comune {
	ID: number;
	ProvinciaID: number;
	Provincia: string;
	Nome: string;
	CodiceCatastale: string;
	NomeCompleto: string;	
}

export class Common {
	ID: number;
	Nome: string;
};

export class Circostanze {
	ID: number;
	Circostanza: string;	
};

export class Options {
	TipoID: number;
	EntitaCosti: Common[];
	Circostanze: Circostanze[];
	TipologieVeicolo: Common[];
};

export class CompleteListItem {
	name?: string;
	value?: number;
	text?: string;
};
