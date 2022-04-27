/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

import {
	DataFormat,
	DEFAULT_RETURN_FORMAT,
	EthExecutionAPI,
	FormatType,
	PromiEvent,
} from 'web3-common';
import { SupportedProviders } from 'web3-core';
import { ContractAbi } from 'web3-eth-abi';
import { SendTransactionEvents, ReceiptInfo } from 'web3-eth';
import { Address, BlockNumberOrTag, Bytes, HexString, Numbers, Uint } from 'web3-utils';

export interface EventLog {
	event: string;
	address: string;
	returnValues: unknown;
	logIndex: number;
	transactionIndex: number;
	transactionHash: string;
	blockHash: string;
	blockNumber: number;
	raw?: { data: string; topics: unknown[] };
}

export interface ContractEventOptions {
	filter?: Record<string, unknown>;
	fromBlock?: BlockNumberOrTag;
	topics?: string[];
}

export interface ContractOptions {
	readonly gas: Uint | null;
	readonly gasPrice: Uint | null;
	readonly gasLimit?: Uint;
	readonly from?: Address;
	readonly data?: Bytes;
	jsonInterface: ContractAbi;
	address?: Address; // All transactions generated by web3.js from this contract will contain this address as the "to".
}

export interface ContractInitOptions {
	readonly gas?: Uint | null;
	readonly gasPrice?: Uint | null;
	readonly from?: Address;
	readonly data?: Bytes;
	readonly gasLimit?: Uint;
	readonly provider: SupportedProviders<EthExecutionAPI>;
}

export type TransactionReceipt = ReceiptInfo;

export interface NonPayableCallOptions {
	nonce?: HexString;
	chainId?: HexString;
	from?: Address;
	to?: Address;
	data?: HexString;
	gas?: string;
	maxPriorityFeePerGas?: HexString;
	maxFeePerGas?: HexString;
	gasPrice?: string;
	type?: string | number;
}

export interface PayableCallOptions extends NonPayableCallOptions {
	value?: string;
}

export type NonPayableTxOptions = NonPayableCallOptions;
export type PayableTxOptions = PayableCallOptions;

export interface NonPayableMethodObject<Inputs = unknown[], Outputs = unknown[]> {
	arguments: Inputs;
	call(tx?: NonPayableCallOptions, block?: BlockNumberOrTag): Promise<Outputs>;
	send(
		tx?: NonPayableTxOptions,
	): PromiEvent<FormatType<ReceiptInfo, typeof DEFAULT_RETURN_FORMAT>, SendTransactionEvents>;
	estimateGas<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		options?: NonPayableCallOptions,
		returnFormat?: ReturnFormat,
	): Promise<FormatType<Numbers, ReturnFormat>>;
	encodeABI(): string;
}

export interface PayableMethodObject<Inputs = unknown[], Outputs = unknown[]> {
	arguments: Inputs;
	call(tx?: PayableCallOptions, block?: BlockNumberOrTag): Promise<Outputs>;
	send(
		tx?: PayableTxOptions,
	): PromiEvent<FormatType<ReceiptInfo, typeof DEFAULT_RETURN_FORMAT>, SendTransactionEvents>;
	estimateGas<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(
		options?: PayableCallOptions,
		returnFormat?: ReturnFormat,
	): Promise<FormatType<Numbers, ReturnFormat>>;
	encodeABI(): HexString;
}