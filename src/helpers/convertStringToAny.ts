import { DataBytes, DataDynamic } from "coreum-js/dist/main/coreum/asset/nft/v1/types";
import { Any } from 'google-protobuf/google/protobuf/any_pb';

export const convertStringToAny = (message: string): Any => {
    const formattedValueOfData = btoa(message);
    const dataBytesMessage = DataBytes.fromJSON({ Data: formattedValueOfData });
    const dataBytesBinary = DataBytes.encode(dataBytesMessage).finish();

    const formattedAnyDataValue = new Any();
    formattedAnyDataValue.setTypeUrl('/coreum.asset.nft.v1.DataBytes');
    formattedAnyDataValue.setValue(dataBytesBinary);

    return formattedAnyDataValue;
};

export const convertStringToUint8Array = (message: string) => {
    const formattedValueOfData = btoa(message);
    const dataBytesMessage = DataBytes.fromJSON({ Data: formattedValueOfData });
    const dataBytesBinary = DataBytes.encode(dataBytesMessage).finish();

    return dataBytesBinary;
};

export const convertStringToDataDynamic = (items: any[]): Any => {
    const dataBytesMessage = DataDynamic.fromJSON({ items });
    const dataDynamicBinary = DataDynamic.encode(dataBytesMessage).finish();

    const formattedAnyDataValue = new Any();
    formattedAnyDataValue.setTypeUrl('/coreum.asset.nft.v1.DataDynamic');
    formattedAnyDataValue.setValue(dataDynamicBinary);

   return formattedAnyDataValue;
};
