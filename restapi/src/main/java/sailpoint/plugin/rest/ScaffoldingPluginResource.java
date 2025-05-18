package sailpoint.plugin.rest;  
  
import java.util.HashMap;  
import java.util.Map;  
  
import javax.ws.rs.Consumes;  
import javax.ws.rs.GET;  
import javax.ws.rs.Path;  
import javax.ws.rs.PathParam;  
import javax.ws.rs.Produces;  
  
import org.apache.log4j.Logger;  
  
import sailpoint.api.SailPointContext;  
import sailpoint.api.SailPointFactory;  
import sailpoint.object.Identity;  
import sailpoint.rest.plugin.AllowAll;  
import sailpoint.rest.plugin.BasePluginResource;  
import sailpoint.tools.GeneralException;  
import sailpoint.tools.Util;
import java.lang.StringBuilder;  
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;
import javax.ws.rs.POST;  
  import javax.ws.rs.core.MediaType;
  
  import sailpoint.object.Filter;
  import sailpoint.object.QueryOptions;
  import sailpoint.object.ProvisioningTransaction;
  import sailpoint.object.ProvisioningPlan.AccountRequest;
  import sailpoint.object.Attributes;
  
@Path("scaffolding")  
@Produces({ "application/json" })  
@Consumes({ "application/json", "*/*" })  
public class ScaffoldingPluginResource extends BasePluginResource {  
  
        private static final Logger logger = Logger.getLogger(ScaffoldingPluginResource.class);  
  
        @Override  
        public String getPluginName() {  
                return "ScaffoldingPlugin";  
        }  
  
		@GET
		@Path("provisioningTransactions/{name}")
		  @AllowAll
		@Consumes({MediaType.APPLICATION_JSON})
		@Produces({MediaType.APPLICATION_JSON})	
		public Object provTransaction( @PathParam("name") String identityName) throws GeneralException {
			System.out.println("provTransaction:started");
			logger.warn("provTransaction:started:"+identityName);
			List<Map<String,Object>> resultList = null;
			Map<String,Object> rowMap = null;
			if(null != identityName){
				 SailPointContext context = SailPointFactory.getCurrentContext(); 
				Filter filterName = Filter.eq("identityName",identityName);
				QueryOptions qo = new QueryOptions();
				qo.add(filterName);
				qo.setCloneResults(true);
				
				Iterator<ProvisioningTransaction> iterator = context.search(ProvisioningTransaction.class,qo);
				
				while(iterator.hasNext()){
					ProvisioningTransaction pt = iterator.next();
					String ptName = pt.getName();
					Attributes attributes = pt.getAttributes();
					String applicationName = null;
					String nativeIdentity = null;
					if(null != attributes){
					AccountRequest accountRequest = (AccountRequest)attributes.get("request");
					
					if(null != accountRequest){
					 applicationName = accountRequest.getApplication();
					 nativeIdentity = accountRequest.getNativeIdentity();
					}
					}
					if(null == rowMap){
						rowMap = new HashMap<String,Object>();
					}
					if(null == resultList){
						resultList = new ArrayList<Map<String,Object>>();
					}
					rowMap.put("name",ptName);
					rowMap.put("applicationName",applicationName);
					rowMap.put("nativeIdentity",nativeIdentity);
					
					resultList.add(rowMap);
					rowMap = null;
				}
				Util.flushIterator(iterator);
			}
			System.out.println("provTransaction:finished");
			return resultList;
		}
  
  
		public String convertToString(InputStream stream){
			
			  StringBuilder crunchifyBuilder = new StringBuilder();
	        try {
	            BufferedReader in = new BufferedReader(new InputStreamReader(stream));
	            String line = null;
	            while ((line = in.readLine()) != null) {
	                crunchifyBuilder.append(line);
	            }
	        } catch (Exception e) {
	        	logger.error("Error Parsing: - ");
	        }
	        
	        String resultString = crunchifyBuilder.toString();
			return resultString;
		}
        @GET  
        @Path("info/{name}")  
        @AllowAll  
        public Object getInfo(@PathParam("name") String identityName) throws GeneralException {  
                if (logger.isDebugEnabled()) {  
                        logger.debug(">>> getInfo");  
                        logger.debug("identityName = " + identityName);  
                }  
                Map<String, Object> identityModel = new HashMap<String, Object>();  
  
                SailPointContext context = SailPointFactory.getCurrentContext();  
  
                Identity identity = context.getObject(Identity.class, identityName);  
                if (identity != null) {  
                        identityModel.put("name", identity.getName());  
                        identityModel.put("id", identity.getId());  
                        identityModel.put("email", identity.getEmail());  
                }  
  
                if (logger.isDebugEnabled()) {  
                        logger.debug("returns " + identityModel);  
                        logger.debug("<<< getInfo");  
                }  
                return identityModel;  
        }  
}