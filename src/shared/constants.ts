export const API_URL: string = 'http://tablet.oxygencar.it';

export const PRATICHE_TAB_VALUES = [
  {text: 'outlook', value: 0}, 
  {text: 'pagamento', value: 1},
  {text: 'foto', value: 2},
  {text: 'documenti', value: 3},
  {text: 'preventivi', value: 4},
  {text: 'noleggi', value: 5}
];

export const COLORS = {
  NON_ASSEGNATO: 1,
  GREEN: 2,
  YELLOW: 3,
  RED: 4,
  BLUE: 5,
  ORANGE: 6,
  PURPLE: 7,
  WHITE: 8
};

export const APERTE_FIRST_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1},
];

export const APERTE_SECOND_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1},
  {text: 'sinistro', value: 2}
];


export const APERTE_TAB_VALUES = [
  {text: 'veicolo', value: 0}, 
  {text: 'cliente', value: 1},
  {text: 'sinistro', value: 2},
  {text: 'controparte', value: 3},
];

export const NOLEGGIO_TAB_VALUES = [
  {text: 'UTILIZZATORE', value: 0}, 
  {text: 'UTILIZZATORE 2', value: 1},
  {text: 'CONSEGNA A', value: 2},
  {text: 'STATO VEICOLO', value: 3},
  {text: 'DETTAGLIO', value: 4},
];

export const PHOTOS_KEY: string = 'photoes';

export const DOCUEMTNS_KEY: string = 'documents';


/**
 * Each  creation  case,  if  tabbed:
 * has  a  TipoID  value  to  be  passed  to  the  insert  views
 */
export const CREATION_CASE = {
  RIPARAZIONE_MANUTENZIONE_CHECKUP: 100,
  RIMBORSO_ASSICURATIVO_RCA: 1,
  RADD_KASCO: 3, // RIMBORSO  ASSICURATIVO  DANNI  DIVERSI has subcases with different TipoID
  RADD_ATTI_VANDALICI: 4,
  RADD_EVENTI_NATURALI_GRANDINE: 5,
  RADD_FURTO_PARZIALE: 6,
  RADD_CRISTALLI: 7,
  RADD_RESPONSABILITA_DIRETTA: 8,
  RADD_ALTRI_DANNI: 9
};