import { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider, useColorMode } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import customTheme from '../styles/theme'

const GlobalStyle = ({ children }) => {
    const { colorMode } = useColorMode();
    return (
        <>
            <Global
                styles={css`
                    ::selection {
                        background-color: #90CDF4;
                        color: #fefefe;
                    }
                    ::-moz-selection {
                        background: #ffb7b7;
                        color: #fefefe;
                    }
                    html {
                        min-width: 356px;
                        scroll-behavior: smooth;
                    }
                    #__next {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        background: ${colorMode === 'light' ? 'white' : '#171717'};
                    }
                `}
            />
            {children}
        </>
    )
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS theme={customTheme}>
            <ColorModeProvider options={{
                initialColorMode: 'dark',
                useSystemColorMode: true,
            }}>
                <GlobalStyle>
                    <Component {...pageProps} />
                </GlobalStyle>
            </ColorModeProvider>
        </ChakraProvider>
    )
}