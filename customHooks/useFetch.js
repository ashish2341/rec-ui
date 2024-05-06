"use client"
import { useReducer, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiActions } from "@/utils/constants";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

function reducer(state, { type, payload }) {
    switch (type) {
        case apiActions.FETCH_DATA:
            return { ...state, loading: true };
        case apiActions.SET_DATA:
            return { ...state, data: payload, loading: false };
        case apiActions.SET_ERROR:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
}

const useFetch = (url) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const userToken = Cookies.get("token");


    useEffect(() => {
        // Create a new CancelToken source for this request
        const cancelSource = axios.CancelToken.source();
        (async () => {
            try {
                dispatch({ type: apiActions.FETCH_DATA });
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${userToken}`, // Add the Authorization header with the token
                    },
                    cancelToken: cancelSource.token,
                });
                dispatch({ type: apiActions.SET_DATA, payload: res?.data });
            } catch (error) {
                // If the error was not caused by cancelling the request, update the error state
                if (!axios.isCancel(error)) {
                    dispatch({ type: apiActions.SET_ERROR, payload: error });
                }
            }
        })();
        return () => {
            cancelSource.cancel("Operation cancelled by the user");
        };
    }, [url]);
    return state;
};

export default useFetch;