import { RentDocumentItem } from "./rentDocument";

export class Noleggio {
	ID: number;
	PraticaID: number;
	Cliente: string;
	UtilizzatoreID: number;
	Utilizzatore: Utilizzatore;
	PrenotazioneID: number;
	Prenotazione: any;
	VetturaID: number;
	Vettura: string;
	DataConsegna: string;
	DataRestituzione: string;
	DataRestituzioneStimata: string;
	FatturazioneNome: string;
	FatturazioneCognome: string;
	FatturazioneCap: string;
	FatturazioneComune: string;
	FatturazioneIndirizzo: string;
	FatturazioneProvincia: string;
	FatturazioneNazione: string;
	FatturazionePartitaIva: string;
	FatturazioneDocumento: string;
	FatturazioneDocumentoNumero: string;
	FatturazioneDocumentoRilascioEnte: string;
	FatturazioneDocumentoRilascioData: string;
	FatturazioneDocumentoScadenza: string;
	FatturazioneTelefono: string;
	FatturazioneEmail: string;
	FatturazioneCellulare: string;
	AnagraficaNome: string;
	AnagraficaCognome: string;
	AnagraficaCodiceFiscale: string;
	AnagraficaTelefono: string;
	AnagraficaEmail: string;
	AnagraficaCellulare: string;
	AnagraficaResidenzaIndirizzo: string;
	AnagraficaResidenzaCap: string;
	AnagraficaResidenzaProvincia: string;
	AnagraficaResidenzaComune: string;
	AnagraficaResidenzaNazione: string;
	AnagraficaPatenteCategoria: string;
	AnagraficaPatenteNumero: string;
	AnagraficaPatenteRilascioEnte: string;
	AnagraficaPatenteRilascioData: string;
	AnagraficaPatenteScadenzaData: string;
	Anagrafica2Nome: string;
	Anagrafica2Cognome: string;
	Anagrafica2CodiceFiscale: string;
	Anagrafica2Telefono: string;
	Anagrafica2Email: string;
	Anagrafica2Cellulare: string;
	Anagrafica2ResidenzaIndirizzo: string;
	Anagrafica2ResidenzaCap: string;
	Anagrafica2ResidenzaProvincia: string;
	Anagrafica2ResidenzaComune: string;
	Anagrafica2ResidenzaNazione: string;
	Anagrafica2PatenteCategoria: string;
	Anagrafica2PatenteNumero: string;
	Anagrafica2PatenteRilascioEnte: string;
	Anagrafica2PatenteRilascioData: string;
	Anagrafica2PatenteScadenzaData: string;
	TariffaGiornata: number;
	CarburanteUscita: number;
	KmUscita: number;
	Note: string;
	KmGiorno: number;
	TipoNoleggio: number;
	Sinistri: Array<Sinistri>;
	Documenti: Array<RentDocumentItem>;
	FolderUrl: string;
	VetturaImageUrl: string;
	LetteraNoleggioConsegnaUrl: string;
	LetteraNoleggioConsegnaThumbUrl: string;
	LetteraNoleggioRientroUrl: string;
	LetteraNoleggioRientroThumbUrl: string;


	constructor() {
		this.Utilizzatore = new Utilizzatore();
	}
};


export class Utilizzatore {
	ID: number;
	RuoloID: number;
	Ruolo: string;
	Nome: string;
	Email: string;
	PagamentoFedercarrozzieriData: string;
	PagamentoFedercarrozzieri: string;
	Telefono: string;
	ResidenzaComune: string;
	ResidenzaProvincia: string;
	LicenzaNoleggio: boolean;
	PraticheFatturabili: Array<any>;
	TotalePratiche: number;
	TotalePraticheFatturabili: number
}

export class Sinistri {
	ID: number;
	NoleggioID: number;
	VetturaID: number;
	SinistroData: string;
	Sinistro: string;
	Risolto: boolean;
	DataRisoluzione: string;
	Immagini: Array<any>;
}

export class Rientro {
	ID: number;
	DataRestituzione: string;
	KmEntrata: number;
	CarburanteEntrata: number;
	Note: string;
	TariffaGiornata: number;
	KmGiorno : number;
}

// export class SinistriInsertRequest {
// 	NoleggioID: number;
// 	VetturaID: number;
// 	SinistroData: string;
// 	Sinistro: string;
// }