import PropTypes from 'prop-types';

/**
 * A component that conditionally renders its children based on a controller property.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.controllerProperty - A boolean that controls the rendering of children.
 * @param {React.ReactNode} props.children - The child elements to render if the controller property is true.
 * @returns {React.ReactNode|null} The rendered children if the controller property is true, otherwise null.
 */
const PropertyControlledComponent = (props) => {
  const { controllerProperty, children } = props;
  return controllerProperty ? children : null;
};

PropertyControlledComponent.propTypes = {
  controllerProperty: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PropertyControlledComponent;
