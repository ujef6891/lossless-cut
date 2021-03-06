import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import i18n from 'i18next';

import { isStoreBuild } from './util';

const electron = window.require('electron'); // eslint-disable-line


const ReactSwal = withReactContent(Swal);

// eslint-disable-next-line import/prefer-default-export
export function openSendReportDialog(err, state) {
  const reportInstructions = isStoreBuild
    ? <p>Please send an email to <span style={{ fontWeight: 'bold' }} role="button" onClick={() => electron.shell.openExternal('mailto:losslesscut@yankee.no')}>losslesscut@yankee.no</span> where you describe what you were doing.</p>
    : <p>Please create an issue at <span style={{ fontWeight: 'bold' }} role="button" onClick={() => electron.shell.openExternal('https://github.com/mifi/lossless-cut/issues')}>https://github.com/mifi/lossless-cut/issues</span> where you describe what you were doing.</p>;

  ReactSwal.fire({
    showCloseButton: true,
    title: i18n.t('Send problem report'),
    html: (
      <div style={{ textAlign: 'left', overflow: 'auto', maxHeight: 300, overflowY: 'auto' }}>
        {reportInstructions}

        <p>Include the following text:</p>

        <div style={{ fontWeight: 600, fontSize: 12, whiteSpace: 'pre-wrap' }} contentEditable suppressContentEditableWarning>
          {`${err ? err.stack : ''}\n\n${JSON.stringify({
            err: err && {
              code: err.code,
              killed: err.killed,
              failed: err.failed,
              timedOut: err.timedOut,
              isCanceled: err.isCanceled,
              exitCode: err.exitCode,
              signal: err.signal,
              signalDescription: err.signalDescription,
            },

            state,
          }, null, 2)}`}
        </div>
      </div>
    ),
  });
}
