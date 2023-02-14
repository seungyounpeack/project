package kr.go.guri.manager.inDataMng.mainBusinessMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.inDataMng.mainBusinessMng.service.MainBusinessMngService;


/**
 * @Description		: 데이터 현황 관리 ServiceImpl
 * @Source        	: MainBusinessMngServiceImpl.java
 * @author 김부권
 * @since 2021. 09. 23.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.09.23.   	김부권          최초 생성
 *   
 * </pre>
 */
@Service("mainBusinessMngService")
public class MainBusinessMngServiceImpl implements MainBusinessMngService {

	@Resource(name = "mainBusinessMngMapper")
	private MainBusinessMngMapper mainBusinessMngMapper;

	@Override
	public int createBusiStatus(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.createBusiStatus(param);
	}

	@Override
	public int createBusiStatusDetail(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.createBusiStatusDetail(param);
	}

	@Override
	public int createBusiStatusStatic(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.createBusiStatusStatic(param);
	}

	@Override
	public int updateBusiStatus(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.updateBusiStatus(param);
	}
	
	@Override
	public int deleteFileDetail(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.deleteFileDetail(param);
	}
	
	@Override
	public int deleteBusiContents(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.deleteBusiContents(param);
	}
	
	@Override
	public int deleteBusiDetailContents(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.deleteBusiDetailContents(param);
	}

	@Override
	public int updateBusiStatusDetail(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.updateBusiStatusDetail(param);
	}

	@Override
	public int updateBusiStatusStatic(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.updateBusiStatusStatic(param);
	}

	@Override
	public Map<String, Object> selectGetFileId() throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.selectGetFileId();
	}
	
	@Override
	public Map<String, Object> selectBusiNo() throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.selectBusiNo();
	}

	@Override
	public List<Map<String, Object>> selectBusiList() throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.selectBusiList();
	}

	@Override
	public List<Map<String, Object>> selectBusiDesc(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.selectBusiDesc(param);
	}
	
	@Override
	public Map<String, Object> selectBusiFileInfo(Map<String, Object> param) throws IOException, SQLException {
		// TODO Auto-generated method stub
		return mainBusinessMngMapper.selectBusiFileInfo(param);
	}



}
