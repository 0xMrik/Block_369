import React from "react";
import { FormControl, FormLabel, Input, Tooltip } from "@chakra-ui/react";

const DescriptionInput = ({ id, label, placeholder, value, onChange, tooltip }) => {
    return (
        <FormControl id={id}>
          <FormLabel fontSize="xl">{label}:</FormLabel>
          <Tooltip label={tooltip} aria-label="A tooltip">
            <Input placeholder={placeholder} value={value} onChange={onChange} />
          </Tooltip>
        </FormControl>
      );
    };

export default DescriptionInput;