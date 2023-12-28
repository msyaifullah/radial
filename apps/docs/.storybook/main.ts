import {dirname, join, resolve} from "path";

function getAbsolutePath(value: string): string {
    return dirname(require.resolve(join(value, "package.json")));
}

interface Config {
    stories: string[];
    addons: string[];
    framework: {
        name: string;
        options: {};
    };
    core: {};
    viteFinal: (config: any, options: { configType: string }) => Promise<any>;
    docs: {
        autodocs: boolean;
    };
}

const config: Config = {
    stories: [
        "../stories/*.stories.tsx",
        "../stories/**/*.stories.tsx",
        "../stories/*.stories.mdx",
        "../stories/**/*.stories.mdx"
    ],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-docs"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },
    core: {},
    async viteFinal(config, {configType}) {
        // customize the Vite config here
        return {
            ...config,
            define: {"process.env": {}},
            resolve: {
                alias: [
                    {
                        find: "ui",
                        replacement: resolve(__dirname, "../../../packages/ui/"),
                    },
                ],
            },
        };
    },
    docs: {
        autodocs: true,
    },
};

export default config;
