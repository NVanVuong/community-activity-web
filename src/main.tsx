import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#3A81B3"
                    },
                    components: {
                        Progress: {
                            defaultColor: "#3A81B3"
                        }
                    }
                }}
            >
                <App />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
)
