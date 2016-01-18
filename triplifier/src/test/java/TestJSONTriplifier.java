import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.vocabulary.DCTerms;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.vocabulary.RDFS;
import it.polito.nexa.triplifiers.DefaultJSONTriplifier;
import org.apache.jena.riot.RDFDataMgr;
import org.apache.jena.riot.RDFFormat;
import org.junit.Test;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * Test the JSONTriplifier class to create RDF
 * files from a specific data model
 *
 */

public class TestJSONTriplifier {

    @Test
    public void testJSONTriplifier () throws FileNotFoundException {
        String inputData = readFile("src/main/resources/data-sample.json");
        String dataModel = readFile("src/main/resources/data-model.json");
        String outputData = "src/main/resources/rdf.nt";
        String subject = "id";

        DefaultJSONTriplifier jsonTriplifier = new DefaultJSONTriplifier(inputData, dataModel, subject);
        Model baseModel = createBaseModel();
        baseModel.add(jsonTriplifier.triplifyJSON());
        publishRDF(outputData, baseModel);

    }

    private Model createBaseModel () {
        Model model = ModelFactory.createDefaultModel();
        Map<String, String> prefixMap = new HashMap<String, String>();
        prefixMap.put("rdfs", RDFS.getURI());
        prefixMap.put("geo", "http://www.w3.org/2003/01/geo/wgs84_pos#");
        prefixMap.put("schema", "http://schema.org/");
        prefixMap.put("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        prefixMap.put("gn", "http://www.geonames.org/ontology#");
        prefixMap.put("rdf", RDF.getURI());
        prefixMap.put("dcterms", DCTerms.getURI());
        model.setNsPrefixes(prefixMap);
        return model;
    }

    private String readFile(String source){
        String data = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(source));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line+"\n");
            }
            br.close();
            data = sb.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    private void publishRDF(String filePath, Model model) throws FileNotFoundException {
        File file = new File(filePath.replaceAll("(.+)/[^/]+", "$1"));
        file.mkdirs();
        OutputStream outTurtle = new FileOutputStream(new File(filePath));
        RDFDataMgr.write(outTurtle, model, RDFFormat.NTRIPLES);
        System.out.println("RDF printed!");
        System.out.println("Check the output: " + filePath);
    }
}
