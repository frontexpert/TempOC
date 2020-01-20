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

export class Marca {
	ID: number;
    Nome: string;
    CodiceUesse: number;
	CodiceCarpoint: string;
    CostruttoreRicambio: boolean;
	CostruttoreVeicolo: boolean;
    Eliminata: boolean;
};

export class Modello {
	ID: number;
    ParentID: number;
    Parent: string;
    Nome: string;
    TelaioFine: string;
    TelaioInizio: string;
    TipoVeicoloID: number;
    DataInizio: string;
    DataFine: string;
};

export class Versione {
	ID: number;
    ParentID: number;
    Parent: string;
    Nome: string;
    NomeCompleto: string;
};

export class VeicoloOptions {
	Marche: Marca[];
	Modelli: Modello[];
	Versioni: Versione[];
};

export class CompleteListItem {
	name?: string;
	value?: number;
	text?: string;
};

export class TextListItem {
	name?: string;
	value?: string;
	text?: string;
};

export class Anagrafica {
	AnagraficaNome: string;
	AnagraficaCognome: string;
	AnagraficaNomeCompleto: string;
	AnagraficaResidenzaCap: string;
	AnagraficaResidenzaComune: string;
	AnagraficaResidenzaIndirizzo: string;
	AnagraficaResidenzaProvincia: string;
	AnagraficaResidenzaNazione: string;
	AnagraficaCodiceFiscale: string;
	AnagraficaPatenteCategoria: string;
	AnagraficaPatenteNumero: string;
	AnagraficaPatenteRilascioEnte: string;
	AnagraficaPatenteRilascioData: string;
	AnagraficaTelefono: string;
	AnagraficaEmail: string;
	AnagraficaCellulare: string;
}

