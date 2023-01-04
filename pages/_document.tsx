/**
 * Global Document File which is included for all the routes
 * @author Robin Varshney (robinvarshn@adobe.com)
 */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { readFileSync } from 'fs';
import { join } from 'path';
import fs from 'fs-extra';

class InlineStylesHead extends Head {
    getCssLinks = ({ allFiles }: any) => {
        const { assetPrefix } = this.context;
        if (!allFiles || allFiles.length === 0) return null;
        if (!fs.existsSync(join(process.cwd(), '.next', allFiles[0]))) return null;

        return allFiles
            .filter((file: string) => /\.css$/.test(file))
            .map((file: string) => (
                <style
                    key={file}
                    nonce={this.props.nonce}
                    data-href={`${assetPrefix}/_next/${file}`}
                    dangerouslySetInnerHTML={{
                        __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
                    }}
                />
            ));
    };
}

export default class MainDocument extends Document {
    toRenderCritical = () => {
        if (fs.existsSync(join(process.cwd(), '.next/static'))) {
            return <InlineStylesHead />;
        }

        return <Head></Head>;
    };
    render() {
        return (
            <Html lang="en">
                {this.toRenderCritical()}
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        );
    }
}
