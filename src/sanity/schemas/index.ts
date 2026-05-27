import type { SchemaTypeDefinition } from 'sanity'
import ctaBanner from './ctaBanner'
import empresa from './empresa'
import empresasInstaladas from './empresasInstaladas'
import home from './home'
import programa from './programa'
import programas from './programas'
import sobre from './sobre'
import tragaSuaEmpresa from './tragaSuaEmpresa'

export const schemaTypes: SchemaTypeDefinition[] = [home, programa, programas, ctaBanner, sobre, tragaSuaEmpresa, empresa, empresasInstaladas]
