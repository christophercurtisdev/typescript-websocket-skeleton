#!/bin/sh

/bin/sh -ec 'cd typescript-server && tsc -b'
/bin/sh -ec 'cd typescript-server && node dist/index.js'