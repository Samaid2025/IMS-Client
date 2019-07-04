import { action_types } from '../actions/actionTypes';
import automaticReports from '../automaticReports';
import { object } from 'prop-types';

const initialState = {
  report: null,
  downloadLink: '',
  automaticReports: [],
  updateReportResponse: null,
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.GET_REPORT_SUCCESS:
      console.log('payload received', action.payload);
      return {
        ...state,
        report: action.payload !== undefined ? action.payload : [],
      };

    case action_types.DOWNLOAD_REPORT_SUCCESS:
      return {
        ...state,
        downloadLink: action.payload.link,
      };

    case action_types.GET_AUTO_REPORT_SUCCESS:
      return {
        ...state,
        automaticReports: action.payload,
      };

    case action_types.UPDATE_REPORT_SUCCESS:
      let report_id = action.payload.data.id;
      return {
        ...state,
        updateReportResponse: action.payload,
        automaticReports: state.automaticReports.map((report) =>
          report.id === report_id
            ? Object.assign({}, report, action.payload.data)
            : report,
        ),
      };

    default:
      return state;
  }
}
