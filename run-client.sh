#!/bin/sh

/bin/sh -ec 'cd typescript-client && npm run build'
/bin/sh -ec 'cd typescript-client && live-server public'