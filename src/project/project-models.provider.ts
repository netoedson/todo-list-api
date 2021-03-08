import { ModelDefinition } from '@nestjs/mongoose';
import { ProjectSchema, ProjectSchemaProvider } from './schemas/project.schema';

export const projectModelsProvider: ModelDefinition[] = [
    {
        name: ProjectSchemaProvider,
        schema: ProjectSchema,
        collection: 'projects',
    },
];