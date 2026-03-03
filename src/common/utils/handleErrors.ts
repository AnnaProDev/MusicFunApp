import { toast } from "react-toastify";
import { isErrorWithDetailArray } from "./isErrorWithDetailArray";
import { trimToMaxLength } from "./trimToMaxLength";
import { isErrorWithProperty } from "./isErrorWithProperty";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorToast } from "./errorToast";

export const handleErrors = (error: FetchBaseQueryError) => {
	if (error) {
		switch (error.status) {
			case "FETCH_ERROR":
			case "PARSING_ERROR":
			case "CUSTOM_ERROR":
			case "TIMEOUT_ERROR":
				errorToast(error.error);
				break;

			case 400:
			case 403:
				if (isErrorWithDetailArray(error.data)) {
					toast(trimToMaxLength(error.data.errors[0].detail), {
						type: "error",
						theme: "colored",
					});
				} else {
					toast(JSON.stringify(error.data), {
						type: "error",
						theme: "colored",
					});
				}
				break;

			case 404:
				if (isErrorWithProperty(error.data, "error")) {
					errorToast(error.data.error);
				} else {
					toast(JSON.stringify(error.data), {
						type: "error",
						theme: "colored",
					});
				}
				break;

			case 401:
			case 429:
				if (isErrorWithProperty(error.data, "message")) {
					errorToast(error.data.message);
				} else {
					toast(JSON.stringify(error.data), {
						type: "error",
						theme: "colored",
					});
				}
				break;

			default:
				if (error.status >= 500 && error.status < 600) {
					toast("Server error occurred. Please try again later.", {
						type: "error",
						theme: "colored",
					});
				} else {
					errorToast("Some error occurred");
				}
		}
	}
};
