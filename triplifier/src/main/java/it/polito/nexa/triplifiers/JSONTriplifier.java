package it.polito.nexa.triplifiers;

import com.hp.hpl.jena.rdf.model.Statement;

import java.util.List;

public interface JSONTriplifier {

    public List<Statement> triplifyJSON(String inputJSON, String dataModel);

    public String cleanString(String s);

}
