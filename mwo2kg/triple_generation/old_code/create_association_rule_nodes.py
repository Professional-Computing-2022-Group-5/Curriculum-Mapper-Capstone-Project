# Create the association rule nodes.
# item_sets: A list of item sets
# entity_objects: a dictionary that maps {id: Entity object} or {id: name} (if entity_nodes is None)
# tx: The graph 
# entity_nodes: a dictionary that maps {id: Entity node} or None
# build_relationships: whether to build relationship between entity nodes and the antecedents/consequents
def create_association_rule_nodes(item_sets, entity_objects, tx, entity_nodes, build_relationships = True):

	print("Calculating association rules...", end="")

	# TODO: Expand item sets to include parents

	time_start = time.time()

	itemsets, rules = apriori(item_sets, min_support=0.0005, min_confidence=0.7)
	sorted_rules = sorted(rules, key=lambda rule: rule.lift, reverse=True)

	def rule_side_to_str(rule_side):
		if entity_objects is None:
			return ", ".join(sorted([item for item in rule_side]))
		else:
			return ", ".join(sorted([entity_objects[item].name for item in rule_side]))

	# Construct unique antecendent and consequent nodes
	antecedent_nodes = {}
	consequent_nodes = {}
	for rule in sorted_rules:
		a_name = rule_side_to_str(rule.lhs)
		c_name = rule_side_to_str(rule.rhs)

		if a_name not in antecedent_nodes:
			a = Node("Association_Rule", "Antecedent", name=a_name)
			antecedent_nodes[a_name] = a
			tx.create(a)

		if c_name not in consequent_nodes:
			c = Node("Association_Rule", "Consequent", name=c_name)
			consequent_nodes[c_name] = c
			tx.create(c)

	# Build the relationships between antecedents and consequents
	
	for rule in sorted_rules:
		a_name = rule_side_to_str(rule.lhs)
		c_name = rule_side_to_str(rule.rhs)	

		if build_relationships:
			for e in rule.lhs:
				ea = Relationship(entity_nodes[e], "IN", antecedent_nodes[a_name])	
				tx.create(ea)

			for e in rule.rhs:
				ec = Relationship(entity_nodes[e], "IN", consequent_nodes[c_name])	
				tx.create(ec)
			
		ac = Relationship(antecedent_nodes[a_name], "IMPLIES", consequent_nodes[c_name], confidence=rule.confidence, lift=rule.lift, support=rule.support)
		tx.create(ac)

	print("\rCalculating association rules... done (%.2fs)" % (time.time() - time_start))