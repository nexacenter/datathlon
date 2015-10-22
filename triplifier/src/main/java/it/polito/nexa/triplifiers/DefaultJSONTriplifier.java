package it.polito.nexa.triplifiers;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hp.hpl.jena.rdf.model.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


public class DefaultJSONTriplifier {

    private String inputData;
    private String dataModel;
    private String subject;

    public DefaultJSONTriplifier(String inputData, String dataModel, String subject) {
        this.inputData = inputData;
        this.dataModel = dataModel;
        this.subject = subject;
    }

    public List<Statement> triplifyJSON() {

        List<Statement> results = new ArrayList<>();
        ObjectMapper inputJSONMapper = new ObjectMapper();
        ObjectMapper dataModelMapper = new ObjectMapper();

        try {
            JsonNode rootInputJSON = inputJSONMapper.readValue(inputData, JsonNode.class);
            JsonNode rootDataModel = dataModelMapper.readValue(dataModel, JsonNode.class);
            JsonNode mapperDataModel = rootDataModel.get(1).get("propertiesToMap").get(0);

            for (JsonNode node : rootInputJSON) {
                // Define a subject from the JSON file
                String subjectValue = getValue(cleanString(subject), node);
                Resource subjectURI = ResourceFactory.createResource(subjectValue);
                results.addAll(createSimpleLiterals(subjectURI, node, mapperDataModel));
            }
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }

    public List<Statement> createSimpleLiterals(Resource subject, JsonNode node, JsonNode mapper) {
        List<Statement> results = new ArrayList<>();
        Iterator<Map.Entry<String, JsonNode>> nodeIterator = node.fields();
        while (nodeIterator.hasNext()) {
            Map.Entry<String, JsonNode> entry = (Map.Entry<String, JsonNode>) nodeIterator.next();
            String propertyMap = getValue(entry.getKey().toString(), mapper);
            if(!propertyMap.equals("") && !propertyMap.equals("notSet")) {
                Property property =  ResourceFactory.createProperty(getValue(entry.getKey().toString(), mapper));
                Literal literal = ResourceFactory.createPlainLiteral(entry.getValue().toString().replace("\"", ""));
                Statement basicStatement = ResourceFactory.createStatement(subject, property, literal);
                results.add(basicStatement);
            }
        }
        return results;
    }

    public String cleanString(String s) {
        s = s.replaceAll("´", "'")
                .replaceAll("’", "")
                .replaceAll("'", "")
                .replaceAll("[“”]", "\"")
                .replaceAll("\"", "")
                .replaceAll("–", "-")
                .replaceAll("\t{2,}", "\t")
                .replaceAll(":", "")
                .replaceAll("°", "")
                .replaceAll("\\?", "")
                .replaceAll("[()]", "")
                .replaceAll("-", "")
                .replaceAll("\\.", "_")
                .replaceAll("\\[", "")
                .replaceAll("\\]","")
                .replaceAll(",", "")
                .replace(" ", "_")
                .replace("/", "_")
                .replaceAll("__", "_")
                .toLowerCase();
        return s;
    }

    private String getValue (String string, JsonNode record) {
        return record.get(string) != null ? record.get(string).asText() : "";
    }
}