import { argumentDefaults } from '../../defaults'

const getDefaultArgValue = arg =>
  (arg.defaultValue ? `"${arg.defaultValue}"` : argumentDefaults[arg.name])

const constructQueryArguments = (args, skipArgs = []) =>
  args
    .filter(arg => !skipArgs.includes(arg.name))
    .map(arg => arg.name + ':' + getDefaultArgValue(arg))
    .join(',')

const constructRecursiveProperties = type => {
  const fields = type.getFields()
  return Object.keys(fields)
    .map(
      field =>
        `${fields[field].name}{${constructPropertiesFromType(fields[field].type)}}`
    )
    .join(',')
}

const constructPropertiesFromType = type =>
  (type.ofType
    ? Object.keys(type.ofType.getFields()).join(',')
    : constructRecursiveProperties(type))

const getObjectClassName = obj => obj && obj.constructor.name

export const formatQueryToString = ({ name, type, args }, skipArgs) => {
  if (getObjectClassName(type.ofType) === 'GraphQLScalarType') {
    return name
  }
  return `${name}(${constructQueryArguments(args, skipArgs)}){${constructPropertiesFromType(type)}}`
}
