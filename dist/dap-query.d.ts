
export as namespace dap;
export function parseDAS(txt:string):DapDAS;
export function parseDDX(txt:string):DapDDX;
export function parseData(txt:string,das?:DapDAS,_fillValues?:DapFillMap):DapData;
export function simplify(data:DapData):DapData;
export function makeQuery(ddx:DapDDX,variable:string,params?:DimensionSlices):string;
export function sliceToQuery(slice:DapSlice):string;
//
export interface DapDAS{
	variables:{[key:string]:any};
	attr?:{[key:string]:any};
}

export interface DapDDX{
	variables:{[key:string]:any};
}

export type DapVariableData = number | Date | DapVariableDataArray;

export interface DapVariableDataArray extends Array<DapVariableData> {}

export interface DapData{
	[key:string]:DapVariableData;
}

export interface DapFillMap{
	[key:string]:number;
}

export type DapSlice = number | Array<number>;

export type DimensionSlices = {[key:string]:DapSlice};

//export module dap{
//	function parseDAS(txt:string):DapDAS;
//	function parseDDX(txt:string):DapDDX;
//	function parseData(txt:string,das?:DapDAS,_fillValues?:DapFillMap):DapData;
//	function simplify(data:DapData):DapData;
//	function makeQuery(ddx:DapDDX,variable:string,params?:DimensionSlices):string;
//}