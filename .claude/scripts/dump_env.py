#!/usr/bin/env python3
import sys
import json
with open('/tmp/dump.json', 'w') as f:
    json.dump(dict(sys.stdin.read()), f)
