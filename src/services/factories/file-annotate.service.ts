import logger from "../../util/logger.util";
import { APP_IDENTIFIER } from "../../util/secrets.util";

import vision from '@google-cloud/vision';
import fs from 'fs';
import path from 'path';

export enum MLProviders {
    NONE = 0,
    AWS = 1,
    GCP = 2
}

interface IFileAnnotate {
    annotateFile(payload: any): Promise<any>;
}


class GCPFileAnnotate implements IFileAnnotate {
    public async annotateFile(payload: any): Promise<any> {

        const filePath = path.resolve(__dirname, "./../../../files");

        payload = [{
            image: {
                content: fs.readFileSync(path.join(filePath, 'fileimage.png'))
            },
            features: [{
                type: 'LABEL_DETECTION',
            }]
        }];

        const client = new vision.v1.ImageAnnotatorClient({
            // optional auth parameters.
        });

        return await client.batchAnnotateImages({ requests: payload });
    }
}


class AWSFileAnnotate implements IFileAnnotate {
    public annotateFile(): Promise<any> {
        return null;
    }
}


class FileAnnotateFactory {
    private static _instance: IFileAnnotate;

    static getInstance(providerType: MLProviders): IFileAnnotate {
        logger.silly(`[${APP_IDENTIFIER}] FileAnnotateFactory getInstance()`);

        // if (providerType === MLProviders.NONE)
        //     return null;

        return this._instance || (this._instance = (providerType === MLProviders.AWS) ?
            new AWSFileAnnotate() : new GCPFileAnnotate());
    }
}


export const fileAnnotate = FileAnnotateFactory.getInstance(MLProviders.GCP);